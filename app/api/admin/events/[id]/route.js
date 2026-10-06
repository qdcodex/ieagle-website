import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { cleanEvent, shapeEvent } from "@/lib/pastEvents";

export const runtime = "nodejs";

async function load(id) {
  if (!ObjectId.isValid(id)) return [null, null];
  const db = await getDb();
  return [db, await db.collection("pastEvents").findOne({ _id: new ObjectId(id) })];
}

// PATCH { title?, date?, place?, description?, coverId? }
export async function PATCH(req, { params }) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const [db, ev] = await load((await params).id);
  if (!ev) return json({ error: "Event not found." }, 404);
  const b = await req.json().catch(() => ({}));
  const set = { updatedAt: new Date() };

  if (["title", "date", "place", "description"].some((k) => k in b)) {
    const { event, error } = cleanEvent({ title: ev.title, date: ev.date, place: ev.place, description: ev.description, ...b });
    if (error) return json({ error }, 400);
    Object.assign(set, event);
  }
  if (b.coverId !== undefined) {
    if (!(ev.photoIds ?? []).some((p) => String(p) === String(b.coverId))) return json({ error: "That photo is not part of this event." }, 400);
    set.coverId = new ObjectId(b.coverId);
  }
  await db.collection("pastEvents").updateOne({ _id: ev._id }, { $set: set });
  return json({ event: shapeEvent(await db.collection("pastEvents").findOne({ _id: ev._id })) });
}

// DELETE — remove the event and its photos
export async function DELETE(_req, { params }) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const [db, ev] = await load((await params).id);
  if (!ev) return json({ error: "Event not found." }, 404);
  await db.collection("eventPhotos").deleteMany({ eventId: ev._id });
  await db.collection("pastEvents").deleteOne({ _id: ev._id });
  return json({ ok: true });
}
