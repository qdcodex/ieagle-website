import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireRole, json, publicUser, hashPassword, MEMBER_TYPES } from "@/lib/auth";
import { APPLICATION_STATUSES } from "@/lib/applications";
import { tempPassword } from "@/lib/temppass";

export const runtime = "nodejs";

// PATCH { status?, note?, approve?: { memberType } }
// "approve" creates a member account from the application and returns a one-time temporary password.
export async function PATCH(req, { params }) {
  const [admin, err] = await requireRole("admin");
  if (err) return err;
  const { id } = await params;
  if (!ObjectId.isValid(id)) return json({ error: "Not found." }, 404);
  const _id = new ObjectId(id);
  const b = await req.json().catch(() => ({}));
  const db = await getDb();
  const app = await db.collection("applications").findOne({ _id });
  if (!app) return json({ error: "Not found." }, 404);

  const set = { updatedAt: new Date(), reviewedBy: admin._id };
  if (typeof b.note === "string") set.note = b.note.slice(0, 1000);
  if (b.status) {
    if (!APPLICATION_STATUSES.includes(b.status)) return json({ error: "Invalid status." }, 400);
    set.status = b.status;
  }

  let created = null;
  if (b.approve) {
    const memberType = b.approve.memberType;
    if (!MEMBER_TYPES[memberType]) return json({ error: "Choose a member type." }, 400);
    if (await db.collection("users").findOne({ email: app.email })) {
      return json({ error: `An account for ${app.email} already exists.` }, 409);
    }
    const password = tempPassword();
    const now = new Date();
    const doc = {
      name: app.name,
      email: app.email,
      role: "member",
      memberType,
      phone: app.contact,
      company: app.company,
      designation: app.designation,
      category: app.category,
      chapter: "",
      address: app.address,
      district: app.district,
      gst: app.gst,
      applicationNo: app.applicationNo,
      passwordHash: await hashPassword(password),
      mustChangePassword: true,
      status: "active",
      createdBy: admin._id,
      createdAt: now,
      updatedAt: now,
    };
    const r = await db.collection("users").insertOne(doc);
    set.status = "approved";
    set.memberId = r.insertedId;
    created = { user: publicUser({ ...doc, _id: r.insertedId }), tempPassword: password };
  }

  await db.collection("applications").updateOne({ _id }, { $set: set });
  const { _id: oid, ...updated } = await db.collection("applications").findOne({ _id });
  return json({ application: { id: String(oid), ...updated }, ...(created ?? {}) });
}
