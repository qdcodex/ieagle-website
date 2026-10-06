import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { shapeEvent } from "@/lib/pastEvents";

export const runtime = "nodejs";

// DELETE — remove one photo from an event
export async function DELETE(_req, { params }) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const { id, photoId } = await params;
  if (!ObjectId.isValid(id) || !ObjectId.isValid(photoId)) return json({ error: "Not found." }, 404);
  const db = await getDb();
  const ev = await db.collection("pastEvents").findOne({ _id: new ObjectId(id) });
  if (!ev || !(ev.photoIds ?? []).some((p) => String(p) === photoId)) return json({ error: "Not found." }, 404);

  const pid = new ObjectId(photoId);
  const remaining = ev.photoIds.filter((p) => String(p) !== photoId);
  await db.collection("eventPhotos").deleteOne({ _id: pid, eventId: ev._id });
  await db.collection("pastEvents").updateOne(
    { _id: ev._id },
    { $set: { photoIds: remaining, coverId: String(ev.coverId) === photoId ? remaining[0] ?? null : ev.coverId, updatedAt: new Date() } }
  );
  return json({ event: shapeEvent(await db.collection("pastEvents").findOne({ _id: ev._id })) });
}
