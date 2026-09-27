// Chapter meeting forms (from the iEagles "Forms" workbook):
// Weekly Follow Up Sheet, Compiled Follow Up Sheet, Attendance Form, List of Category.
import { ObjectId } from "mongodb";

import { FOLLOWUP_FIELDS, MEMBER_EDITABLE, DEFAULT_CATEGORIES, CATEGORY_SLOTS } from "./chapterFormFields";
export { FOLLOWUP_FIELDS, MEMBER_EDITABLE, DEFAULT_CATEGORIES, CATEGORY_SLOTS };

const num = (v, max = 1e9) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.min(Math.round(n * 100) / 100, max) : 0;
};

/** Sanitises one follow-up row coming from a form. */
export function cleanRow(r, allowed) {
  const out = {};
  for (const f of FOLLOWUP_FIELDS) {
    if (allowed && !allowed.includes(f.k)) continue;
    if (!(f.k in r)) continue;
    out[f.k] = f.flag ? !!r[f.k] : num(r[f.k], f.money ? 1e10 : 1000);
  }
  if ((!allowed || allowed.includes("present")) && "present" in r) out.present = !!r.present;
  return out;
}

export async function ensureCategories(db) {
  const col = db.collection("categories");
  if ((await col.estimatedDocumentCount()) === 0) {
    await col.insertMany(DEFAULT_CATEGORIES.map((name, i) => ({ name, order: i + 1, createdAt: new Date() })));
  }
  return col.find().sort({ order: 1, name: 1 }).toArray();
}

/** Meetings of a chapter in date order, numbered Day 1, Day 2, … */
export async function chapterMeetings(db, chapter) {
  const list = await db.collection("meetings").find({ chapter }).sort({ date: 1, createdAt: 1 }).toArray();
  return list.map((m, i) => ({ id: String(m._id), chapter: m.chapter, date: m.date, day: i + 1, title: m.title ?? "" }));
}

export async function chapterMembers(db, chapter, { includeDisabled = false } = {}) {
  const filter = { role: "member", chapter };
  if (!includeDisabled) filter.status = "active";
  const list = await db.collection("users").find(filter).sort({ name: 1 }).toArray();
  return list.map((u) => ({
    id: String(u._id),
    name: u.name,
    company: u.company ?? "",
    businessCategory: u.businessCategory ?? "",
    joinedAt: u.joinedAt ?? u.createdAt,
  }));
}

const dateKey = (d) => new Date(d).toISOString().slice(0, 10);

/**
 * All report data for a chapter: meetings, members, follow-ups,
 * attendance (DoJ / TND / TNA / per-day) and compiled totals.
 */
export async function chapterReport(db, chapter) {
  const [meetings, members] = await Promise.all([chapterMeetings(db, chapter), chapterMembers(db, chapter)]);
  const rows = await db
    .collection("followups")
    .find({ meetingId: { $in: meetings.map((m) => new ObjectId(m.id)) } })
    .toArray();
  const byKey = new Map(rows.map((r) => [`${r.meetingId}|${r.memberId}`, r]));

  const people = members.map((m) => {
    const eligible = meetings.filter((mt) => dateKey(mt.date) >= dateKey(m.joinedAt));
    const days = meetings.map((mt) => {
      const r = byKey.get(`${mt.id}|${m.id}`);
      if (dateKey(mt.date) < dateKey(m.joinedAt)) return null; // before joining
      return r?.present ? "P" : r ? "A" : "";
    });
    const totals = Object.fromEntries(FOLLOWUP_FIELDS.map((f) => [f.k, 0]));
    for (const mt of meetings) {
      const r = byKey.get(`${mt.id}|${m.id}`);
      if (!r) continue;
      for (const f of FOLLOWUP_FIELDS) totals[f.k] += f.flag ? (r[f.k] ? 1 : 0) : Number(r[f.k] || 0);
    }
    const attended = days.filter((d) => d === "P").length;
    return {
      ...m,
      tnd: eligible.length, // Total No. of Days (meetings since joining)
      tna: attended, // Total No. Attended
      attendancePct: eligible.length ? Math.round((attended / eligible.length) * 100) : null,
      days,
      totals,
    };
  });
  return { chapter, meetings, members: people };
}

/** Rows of the weekly sheet for one meeting (every active chapter member). */
export async function meetingSheet(db, meeting) {
  const members = await chapterMembers(db, meeting.chapter);
  const rows = await db.collection("followups").find({ meetingId: meeting._id }).toArray();
  const byMember = new Map(rows.map((r) => [String(r.memberId), r]));
  return members.map((m) => {
    const r = byMember.get(m.id) ?? {};
    return {
      memberId: m.id,
      name: m.name,
      company: m.company,
      present: !!r.present,
      ...Object.fromEntries(FOLLOWUP_FIELDS.map((f) => [f.k, f.flag ? !!r[f.k] : Number(r[f.k] || 0)])),
      updatedByMember: !!r.updatedByMember,
      updatedAt: r.updatedAt ?? null,
    };
  });
}

/** Chapter category list: each category with up to 3 member names. */
export async function chapterCategories(db, chapter) {
  const [cats, members] = await Promise.all([ensureCategories(db), chapterMembers(db, chapter)]);
  return cats.map((c, i) => ({
    id: String(c._id),
    sl: i + 1,
    name: c.name,
    members: members.filter((m) => m.businessCategory === c.name).slice(0, CATEGORY_SLOTS).map((m) => m.name),
  }));
}
