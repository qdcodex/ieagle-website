import { getDb } from "@/lib/db";
import { requireStaff, canUseChapter, chapterDenied, json } from "@/lib/auth";
import { chapterMeetings } from "@/lib/chapterForms";
import { CHAPTERS } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const validChapter = (c) => CHAPTERS.some((x) => x.name === c);

// GET ?chapter= — meetings of a chapter (Day 1, Day 2, …)
export async function GET(req) {
  const [me, err] = await requireStaff();
  if (err) return err;
  const chapter = new URL(req.url).searchParams.get("chapter");
  if (!validChapter(chapter)) return json({ error: "Choose a chapter." }, 400);
  if (!canUseChapter(me, chapter)) return chapterDenied();
  return json({ meetings: await chapterMeetings(await getDb(), chapter) });
}

// POST { chapter, date, title? } — add a meeting
export async function POST(req) {
  const [me, err] = await requireStaff();
  if (err) return err;
  const b = await req.json().catch(() => ({}));
  if (!validChapter(b.chapter)) return json({ error: "Choose a chapter." }, 400);
  if (!canUseChapter(me, b.chapter)) return chapterDenied();
  const date = new Date(b.date);
  if (!b.date || Number.isNaN(date.getTime())) return json({ error: "Choose the meeting date." }, 400);
  const db = await getDb();
  if (await db.collection("meetings").findOne({ chapter: b.chapter, date })) {
    return json({ error: "A meeting on this date already exists for this chapter." }, 409);
  }
  const r = await db
    .collection("meetings")
    .insertOne({ chapter: b.chapter, date, title: String(b.title || "").slice(0, 120), createdBy: me._id, createdAt: new Date() });
  const meetings = await chapterMeetings(db, b.chapter);
  return json({ meeting: meetings.find((m) => m.id === String(r.insertedId)), meetings }, 201);
}
