import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";

export const runtime = "nodejs";

// PATCH { name } — rename a category (members holding it are updated too)
export async function PATCH(req, { params }) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const { id } = await params;
  if (!ObjectId.isValid(id)) return json({ error: "Not found." }, 404);
  const name = String((await req.json().catch(() => ({}))).name || "").trim().slice(0, 120);
  if (!name) return json({ error: "Enter a category name." }, 400);
  const db = await getDb();
  const cat = await db.collection("categories").findOne({ _id: new ObjectId(id) });
  if (!cat) return json({ error: "Not found." }, 404);
  try {
    await db.collection("categories").updateOne({ _id: cat._id }, { $set: { name } });
  } catch {
    return json({ error: "This category already exists." }, 409);
  }
  await db.collection("users").updateMany({ businessCategory: cat.name }, { $set: { businessCategory: name } });
  return json({ category: { id, name, order: cat.order } });
}

// DELETE — remove a category (members holding it are cleared)
export async function DELETE(_req, { params }) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const { id } = await params;
  if (!ObjectId.isValid(id)) return json({ error: "Not found." }, 404);
  const db = await getDb();
  const cat = await db.collection("categories").findOne({ _id: new ObjectId(id) });
  if (!cat) return json({ error: "Not found." }, 404);
  await db.collection("categories").deleteOne({ _id: cat._id });
  await db.collection("users").updateMany({ businessCategory: cat.name }, { $set: { businessCategory: "" } });
  return json({ ok: true });
}
