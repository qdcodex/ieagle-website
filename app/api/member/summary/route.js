import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { chapterReport, chapterCategories, FOLLOWUP_FIELDS } from "@/lib/chapterForms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET — the signed-in member's attendance, follow-up entries, totals and chapter category list
export async function GET() {
  const [me, err] = await requireRole("member");
  if (err) return err;
  if (!me.chapter) return json({ chapter: null });
  const db = await getDb();
  const [report, categories] = await Promise.all([chapterReport(db, me.chapter), chapterCategories(db, me.chapter)]);
  const mine = report.members.find((m) => m.id === String(me._id));
  const entries = await db
    .collection("followups")
    .find({ memberId: me._id, meetingId: { $in: report.meetings.map((m) => new ObjectId(m.id)) } })
    .toArray();
  const byMeeting = new Map(entries.map((e) => [String(e.meetingId), e]));
  const meetings = report.meetings
    .filter((m) => !mine || new Date(m.date).toISOString().slice(0, 10) >= new Date(mine.joinedAt).toISOString().slice(0, 10))
    .map((m) => {
      const e = byMeeting.get(m.id) ?? {};
      return {
        ...m,
        present: e.present ?? null,
        entry: Object.fromEntries(FOLLOWUP_FIELDS.map((f) => [f.k, f.flag ? !!e[f.k] : Number(e[f.k] || 0)])),
      };
    })
    .reverse();
  return json({
    chapter: me.chapter,
    joinedAt: mine?.joinedAt ?? me.joinedAt ?? me.createdAt,
    tnd: mine?.tnd ?? 0,
    tna: mine?.tna ?? 0,
    attendancePct: mine?.attendancePct ?? null,
    totals: mine?.totals ?? {},
    meetings,
    categories: categories.filter((c) => c.members.length),
  });
}
