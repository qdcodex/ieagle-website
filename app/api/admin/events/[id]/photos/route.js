import { ObjectId, Binary } from "mongodb";
import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { shapeEvent, parseDataUrl, MAX_PHOTOS } from "@/lib/pastEvents";

export const runtime = "nodejs";

// POST { dataUrl } — add one photo to an event (the browser resizes it first)
export async function POST(req, { params }) {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const { id } = await params;
  if (!ObjectId.isValid(id)) return json({ error: "Event not found." }, 404);
  const db = await getDb();
  const ev = await db.collection("pastEvents").findOne({ _id: new ObjectId(id) });
  if (!ev) return json({ error: "Event not found." }, 404);
  if ((ev.photoIds?.length ?? 0) >= MAX_PHOTOS) return json({ error: `An event can have up to ${MAX_PHOTOS} photos.` }, 400);

  const { type, buffer, error } = parseDataUrl((await req.json().catch(() => ({}))).dataUrl);
  if (error) return json({ error }, 400);

  const r = await db.collection("eventPhotos").insertOne({ eventId: ev._id, type, size: buffer.length, data: new Binary(buffer), createdAt: new Date() });
  await db.collection("pastEvents").updateOne(
    { _id: ev._id },
    { $push: { photoIds: r.insertedId }, $set: { updatedAt: new Date(), ...(ev.coverId ? {} : { coverId: r.insertedId }) } }
  );
  return json({ event: shapeEvent(await db.collection("pastEvents").findOne({ _id: ev._id })) }, 201);
}
