import { getDb } from "@/lib/db";
import { requireRole, json, publicUser, hashPassword, normEmail, isEmail, MEMBER_TYPES } from "@/lib/auth";
import { tempPassword } from "@/lib/temppass";
import { searchRegex } from "@/lib/escape";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET ?q=&role=member|admin — list users
export async function GET(req) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const p = new URL(req.url).searchParams;
  const q = (p.get("q") || "").trim();
  const filter = { role: p.get("role") === "admin" ? "admin" : "member" };
  if (q) {
    const rx = searchRegex(q);
    filter.$or = [{ name: rx }, { email: rx }, { company: rx }, { chapter: rx }];
  }
  const db = await getDb();
  const users = await db.collection("users").find(filter).sort({ createdAt: -1 }).limit(500).toArray();
  return json({ users: users.map(publicUser) });
}

// POST { name, email, role, memberType, phone, company, category, chapter } — create an account with a temporary password
export async function POST(req) {
  const [admin, err] = await requireRole("admin");
  if (err) return err;
  const b = await req.json().catch(() => ({}));
  const role = b.role === "admin" ? "admin" : "member";
  const email = normEmail(b.email);
  const name = String(b.name || "").trim().slice(0, 120);
  if (!name) return json({ error: "Name is required." }, 400);
  if (!isEmail(email)) return json({ error: "Enter a valid email." }, 400);
  if (role === "member" && !MEMBER_TYPES[b.memberType]) return json({ error: "Choose a member type." }, 400);

  const db = await getDb();
  if (await db.collection("users").findOne({ email })) return json({ error: "An account with this email already exists." }, 409);
  const password = tempPassword();
  const now = new Date();
  const doc = {
    name,
    email,
    role,
    memberType: role === "member" ? b.memberType : null,
    phone: String(b.phone || "").slice(0, 20),
    company: String(b.company || "").slice(0, 200),
    category: String(b.category || "").slice(0, 40),
    chapter: String(b.chapter || "").slice(0, 60),
    businessCategory: String(b.businessCategory || "").slice(0, 120),
    joinedAt: b.joinedAt && !Number.isNaN(new Date(b.joinedAt).getTime()) ? new Date(b.joinedAt) : new Date(),
    passwordHash: await hashPassword(password),
    mustChangePassword: true,
    status: "active",
    createdBy: admin._id,
    createdAt: now,
    updatedAt: now,
  };
  const r = await db.collection("users").insertOne(doc);
  return json({ user: publicUser({ ...doc, _id: r.insertedId }), tempPassword: password }, 201);
}
