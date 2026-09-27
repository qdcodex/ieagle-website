import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireStaff, json, publicUser, hashPassword, MEMBER_TYPES } from "@/lib/auth";
import { tempPassword } from "@/lib/temppass";
import { CHAPTERS } from "@/lib/data";

export const runtime = "nodejs";

// PATCH { status?, memberType?, name?, phone?, company?, category?, chapter?, businessCategory?, joinedAt?, resetPassword? }
export async function PATCH(req, { params }) {
  const [admin, err] = await requireStaff();
  if (err) return err;
  const { id } = await params;
  if (!ObjectId.isValid(id)) return json({ error: "Not found." }, 404);
  const _id = new ObjectId(id);
  const b = await req.json().catch(() => ({}));
  const db = await getDb();
  const user = await db.collection("users").findOne({ _id });
  if (!user) return json({ error: "Not found." }, 404);

  // Chapter directors: only members of their own chapter, and only business category / date of joining.
  if (admin.role === "director") {
    if (user.role !== "member" || user.chapter !== admin.chapter) return json({ error: "You can only manage members of your own chapter." }, 403);
    const extra = Object.keys(b).filter((k) => !["businessCategory", "joinedAt"].includes(k));
    if (extra.length) return json({ error: "Chapter directors can only change business category and date of joining." }, 403);
  }

  const set = { updatedAt: new Date() };
  if (b.status !== undefined) {
    if (!["active", "disabled"].includes(b.status)) return json({ error: "Invalid status." }, 400);
    if (String(_id) === String(admin._id) && b.status !== "active") return json({ error: "You cannot disable your own account." }, 400);
    set.status = b.status;
  }
  if (b.memberType !== undefined) {
    if (!MEMBER_TYPES[b.memberType]) return json({ error: "Invalid member type." }, 400);
    set.memberType = b.memberType;
  }
  for (const k of ["name", "phone", "company", "category", "businessCategory"]) {
    if (typeof b[k] === "string") set[k] = b[k].trim().slice(0, 200);
  }
  if (typeof b.chapter === "string") {
    if (b.chapter && !CHAPTERS.some((c) => c.name === b.chapter)) return json({ error: "Unknown chapter." }, 400);
    set.chapter = b.chapter;
  }
  if (b.joinedAt !== undefined) {
    const d = new Date(b.joinedAt);
    if (Number.isNaN(d.getTime())) return json({ error: "Invalid date of joining." }, 400);
    set.joinedAt = d;
  }

  let password;
  if (b.resetPassword) {
    password = tempPassword();
    set.passwordHash = await hashPassword(password);
    set.mustChangePassword = true;
  }
  await db.collection("users").updateOne({ _id }, { $set: set });
  const updated = await db.collection("users").findOne({ _id });
  return json({ user: publicUser(updated), ...(password ? { tempPassword: password } : {}) });
}
