import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";
import { cleanRow, MEMBER_EDITABLE } from "@/lib/chapterForms";

export const runtime = "nodejs";

// PUT { meetingId, businessGiven, businessReceived, oneToOne, trainings, conference }
// A member fills in their own weekly follow-up. Attendance, Early Bird and Mr. Perfect stay admin-only.
export async function PUT(req) {
  const [me, err] = await requireRole("member");
  if (err) return err;
  const b = await req.json().catch(() => ({}));
  if (!ObjectId.isValid(b.meetingId)) return json({ error: "Choose a meeting." }, 400);
  const db = await getDb();
  const meeting = await db.collection("meetings").findOne({ _id: new ObjectId(b.meetingId) });
  if (!meeting || meeting.chapter !== me.chapter) return json({ error: "Meeting not found for your chapter." }, 404);
  const now = new Date();
  await db.collection("followups").updateOne(
    { meetingId: meeting._id, memberId: me._id },
    {
      $set: { ...cleanRow(b, MEMBER_EDITABLE), chapter: meeting.chapter, updatedBy: me._id, updatedByMember: true, updatedAt: now },
      $setOnInsert: { createdAt: now, present: false, mrPerfect: false, earlyBird: false },
    },
    { upsert: true }
  );
  return json({ ok: true });
}
