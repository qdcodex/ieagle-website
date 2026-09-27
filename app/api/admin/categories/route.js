import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { ensureCategories } from "@/lib/chapterForms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const shape = (c) => ({ id: String(c._id), name: c.name, order: c.order });

// GET — master list of business categories (seeded from the Forms workbook on first use)
export async function GET() {
  const [, err] = await requireRole(null); // members need the list too (for their profile)
  if (err) return err;
  return json({ categories: (await ensureCategories(await getDb())).map(shape) });
}

// POST { name } — add a category (admin)
export async function POST(req) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const name = String((await req.json().catch(() => ({}))).name || "").trim().slice(0, 120);
  if (!name) return json({ error: "Enter a category name." }, 400);
  const db = await getDb();
  await ensureCategories(db);
  if (await db.collection("categories").findOne({ name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } })) {
    return json({ error: "This category already exists." }, 409);
  }
  const last = await db.collection("categories").find().sort({ order: -1 }).limit(1).next();
  const doc = { name, order: (last?.order ?? 0) + 1, createdAt: new Date() };
  const r = await db.collection("categories").insertOne(doc);
  return json({ category: shape({ ...doc, _id: r.insertedId }) }, 201);
}
