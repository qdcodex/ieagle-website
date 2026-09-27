import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { searchRegex } from "@/lib/escape";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET ?status=&q=
export async function GET(req) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const p = new URL(req.url).searchParams;
  const filter = {};
  if (p.get("status")) filter.status = p.get("status");
  const q = (p.get("q") || "").trim();
  if (q) {
    const rx = searchRegex(q);
    filter.$or = [{ name: rx }, { company: rx }, { email: rx }, { applicationNo: rx }, { contact: rx }];
  }
  const db = await getDb();
  const apps = await db.collection("applications").find(filter).sort({ createdAt: -1 }).limit(500).toArray();
  return json({ applications: apps.map(({ _id, ...a }) => ({ id: String(_id), ...a })) });
}
