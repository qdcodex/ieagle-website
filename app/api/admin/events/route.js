import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { cleanEvent, shapeEvent } from "@/lib/pastEvents";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET — all past events, newest first
export async function GET() {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const db = await getDb();
  const list = await db.collection("pastEvents").find().sort({ date: -1, createdAt: -1 }).toArray();
  return json({ events: list.map(shapeEvent) });
}

// POST { title, date, place, description } — create a past event (photos are added afterwards)
export async function POST(req) {
  const [admin, err] = await requireRole("admin");
  if (err) return err;
  const { event, error } = cleanEvent(await req.json().catch(() => ({})));
  if (error) return json({ error }, 400);
  const db = await getDb();
  const now = new Date();
  const doc = { ...event, photoIds: [], coverId: null, createdBy: admin._id, createdAt: now, updatedAt: now };
  const r = await db.collection("pastEvents").insertOne(doc);
  return json({ event: shapeEvent({ ...doc, _id: r.insertedId }) }, 201);
}
