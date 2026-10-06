import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

// Public: one event photo. Photos never change once uploaded, so browsers may cache them for a long time.
export async function GET(_req, { params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new Response("Not found", { status: 404 });
  let doc;
  try {
    doc = await (await getDb()).collection("eventPhotos").findOne({ _id: new ObjectId(id) });
  } catch {
    return new Response("Unavailable", { status: 503 });
  }
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(Buffer.from(doc.data.buffer), {
    headers: {
      "Content-Type": doc.type,
      "Content-Length": String(doc.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
