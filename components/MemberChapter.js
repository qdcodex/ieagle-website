"use client";
import { useEffect, useState } from "react";
import { UserCheck, Save, CheckCircle2, Star, Sunrise, Tags, CalendarDays } from "lucide-react";
import { api, fmtDate } from "@/components/admin/ui";
import { FOLLOWUP_FIELDS, MEMBER_EDITABLE } from "@/lib/chapterFormFields";

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const EDIT_FIELDS = FOLLOWUP_FIELDS.filter((f) => MEMBER_EDITABLE.includes(f.k));

function MeetingEntry({ m, onSaved }) {
  const [f, setF] = useState(() => Object.fromEntries(EDIT_FIELDS.map((x) => [x.k, m.entry[x.k] || ""])));
  const [state, setState] = useState("");
  const [err, setErr] = useState("");

  async function save(e) {
    e.preventDefault();
    setState("saving");
    setErr("");
    try {
      await api("/api/member/followup", { method: "PUT", body: { meetingId: m.id, ...f } });
      setState("saved");
      onSaved();
    } catch (e2) {
      setErr(e2.message);
      setState("");
    }
  }

  return (
    <form onSubmit={save} className="rounded-2xl border border-[#e2e7ef] bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-[#1a2a80]">
          Day {m.day} <span className="font-normal text-[#5b6675]">· {fmtDate(m.date)}</span>
        </p>
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          <span className={`rounded-full px-2.5 py-1 ${m.present ? "bg-[#ecfdf3] text-[#14532d]" : m.present === false ? "bg-[#fef2f2] text-[#b91c1c]" : "bg-[#f0f2f7] text-[#5b6675]"}`}>
            {m.present ? "Present" : m.present === false ? "Absent" : "Attendance pending"}
          </span>
          {m.entry.earlyBird && <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7df] px-2.5 py-1 text-[#8a5a00]"><Sunrise size={12} /> Early Bird</span>}
          {m.entry.mrPerfect && <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7df] px-2.5 py-1 text-[#8a5a00]"><Star size={12} /> Mr. Perfect</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {EDIT_FIELDS.map((x) => (
          <label key={x.k} className="grid gap-1 text-xs font-semibold text-[#5b6675]">
            {x.label}{x.money ? " (₹)" : ""}
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={f[x.k]}
              placeholder="0"
              onChange={(e) => {
                setF({ ...f, [x.k]: e.target.value });
                setState("");
              }}
              className="w-full rounded-lg border border-[#d6dbe8] px-2.5 py-2 text-right text-sm text-[#1c2430] outline-none focus:border-[#1a2a80]"
              style={{ minWidth: 0 }}
            />
          </label>
        ))}
      </div>
      {err && <p className="mt-2 text-sm text-[#b91c1c]">{err}</p>}
      <div className="mt-3 flex items-center justify-end gap-2">
        {state === "saved" && <span className="inline-flex items-center gap-1 text-sm text-[#14532d]"><CheckCircle2 size={15} /> Saved</span>}
        <button disabled={state === "saving"} className="inline-flex items-center gap-1.5 rounded-xl border-0 bg-[#1a2a80] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
          <Save size={15} /> {state === "saving" ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default function MemberChapter() {
  const [d, setD] = useState(null);
  const [err, setErr] = useState("");
  const load = () =>
    api("/api/member/summary")
      .then(setD)
      .catch((e) => setErr(e.message));
  useEffect(() => {
    load();
  }, []);

  if (err) return <p className="rounded-2xl bg-[#fef2f2] p-4 text-[#991b1b]">{err}</p>;
  if (!d) return <p className="py-8 text-center text-[#5b6675]">Loading chapter details…</p>;
  if (!d.chapter)
    return (
      <div className="rounded-3xl border border-dashed border-[#d6dbe8] bg-white p-8 text-center text-[#5b6675]">
        You haven&apos;t been assigned to a chapter yet. The iEagles team will add you to your chapter soon.
      </div>
    );

  return (
    <div className="grid gap-8">
      {/* Attendance + totals */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 !text-xl"><UserCheck size={20} className="text-[#f7b800]" /> {d.chapter} Chapter — my attendance</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Date of joining", fmtDate(d.joinedAt)],
            ["Meetings held (TND)", d.tnd],
            ["Attended (TNA)", d.tna],
            ["Attendance", d.attendancePct === null ? "—" : `${d.attendancePct}%`],
          ].map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#e2e7ef]">
              <p className="text-2xl font-semibold text-[#1a2a80]">{v}</p>
              <p className="text-sm text-[#5b6675]">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {FOLLOWUP_FIELDS.map((f) => (
            <div key={f.k} className="rounded-xl bg-[#f6f8fb] px-3 py-2.5">
              <p className="font-semibold text-[#1a2a80]">{f.money ? inr(d.totals[f.k]) : d.totals[f.k] ?? 0}</p>
              <p className="text-xs text-[#5b6675]">{f.label} total</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly follow-up */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 !text-xl"><CalendarDays size={20} className="text-[#f7b800]" /> Weekly Follow Up</h2>
        <p className="mb-4 text-sm text-[#5b6675]">Enter your business given, business received, 1 to 1s, trainings and conferences for each meeting. Attendance, Early Bird and Mr. Perfect are marked by the chapter team.</p>
        {d.meetings.length ? (
          <div className="grid gap-3">
            {d.meetings.slice(0, 8).map((m) => (
              <MeetingEntry key={m.id} m={m} onSaved={load} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-[#d6dbe8] bg-white p-6 text-center text-[#5b6675]">No chapter meetings recorded yet.</p>
        )}
      </section>

      {/* Category list */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 !text-xl"><Tags size={20} className="text-[#f7b800]" /> {d.chapter} Chapter — List of Category</h2>
        {d.categories.length ? (
          <div className="overflow-hidden rounded-2xl border border-[#e2e7ef] bg-white">
            {d.categories.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eef1f6] px-4 py-2.5 last:border-0">
                <span className="font-medium text-[#1a2a80]">{c.name}</span>
                <span className="text-sm text-[#5b6675]">{c.members.join(", ")}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-[#d6dbe8] bg-white p-6 text-center text-[#5b6675]">No categories assigned in your chapter yet.</p>
        )}
      </section>
    </div>
  );
}
