import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireStaff, canUseChapter, chapterDenied, json } from "@/lib/auth";
import { chapterMeetings, meetingSheet, cleanRow } from "@/lib/chapterForms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function load(id) {
  if (!ObjectId.isValid(id)) return [null, null];
  const db = await getDb();
  return [db, await db.collection("meetings").findOne({ _id: new ObjectId(id) })];
}

// GET — the weekly follow-up sheet for one meeting
export async function GET(_req, { params }) {
  const [me, err] = await requireStaff();
  if (err) return err;
  const [db, meeting] = await load((await params).id);
  if (!meeting) return json({ error: "Meeting not found." }, 404);
  if (!canUseChapter(me, meeting.chapter)) return chapterDenied();
  const meetings = await chapterMeetings(db, meeting.chapter);
  return json({ meeting: meetings.find((m) => m.id === String(meeting._id)), rows: await meetingSheet(db, meeting) });
}

// PUT { rows: [{ memberId, present, businessGiven, … }] } — save the whole sheet
export async function PUT(req, { params }) {
  const [me, err] = await requireStaff();
  if (err) return err;
  const [db, meeting] = await load((await params).id);
  if (!meeting) return json({ error: "Meeting not found." }, 404);
  if (!canUseChapter(me, meeting.chapter)) return chapterDenied();
  const { rows } = await req.json().catch(() => ({}));
  if (!Array.isArray(rows)) return json({ error: "Nothing to save." }, 400);

  const memberIds = rows.map((r) => r.memberId).filter((id) => ObjectId.isValid(id));
  const valid = new Set(
    (await db.collection("users").find({ _id: { $in: memberIds.map((id) => new ObjectId(id)) }, role: "member", chapter: meeting.chapter }, { projection: { _id: 1 } }).toArray()).map(
      (u) => String(u._id)
    )
  );
  const now = new Date();
  const ops = rows
    .filter((r) => valid.has(r.memberId))
    .map((r) => ({
      updateOne: {
        filter: { meetingId: meeting._id, memberId: new ObjectId(r.memberId) },
        update: {
          $set: { ...cleanRow(r), chapter: meeting.chapter, updatedBy: me._id, updatedByMember: false, updatedAt: now },
          $setOnInsert: { createdAt: now },
        },
        upsert: true,
      },
    }));
  if (ops.length) await db.collection("followups").bulkWrite(ops);
  return json({ saved: ops.length, rows: await meetingSheet(db, meeting) });
}

// DELETE — remove a meeting and its entries
export async function DELETE(_req, { params }) {
  const [me, err] = await requireStaff();
  if (err) return err;
  const [db, meeting] = await load((await params).id);
  if (!meeting) return json({ error: "Meeting not found." }, 404);
  if (!canUseChapter(me, meeting.chapter)) return chapterDenied();
  await db.collection("followups").deleteMany({ meetingId: meeting._id });
  await db.collection("meetings").deleteOne({ _id: meeting._id });
  return json({ ok: true, meetings: await chapterMeetings(db, meeting.chapter) });
}
