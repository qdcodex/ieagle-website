import { getDb } from "@/lib/db";
import { json } from "@/lib/auth";
import { shapeEvent } from "@/lib/pastEvents";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: past events for the gallery on the Events page, newest first
export async function GET() {
  try {
    const db = await getDb();
    const list = await db.collection("pastEvents").find().sort({ date: -1, createdAt: -1 }).limit(100).toArray();
    return json({ events: list.map(shapeEvent) });
  } catch {
    return json({ events: [] }, 503);
  }
}
