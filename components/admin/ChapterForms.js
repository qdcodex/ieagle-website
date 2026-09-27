"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarPlus, Save, Printer, Download, Trash2, Plus, Pencil, Check, X, UserCheck, ClipboardList, Sigma, Tags, CircleDot } from "lucide-react";
import { api, Btn, ErrorNote, inputCls, fmtDate } from "./ui";
import { CHAPTERS } from "@/lib/data";
import { FOLLOWUP_FIELDS, CATEGORY_SLOTS } from "@/lib/chapterFormFields";

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const isoDay = (d) => new Date(d).toISOString().slice(0, 10);
const shortDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

function downloadCsv(filename, rows) {
  const esc = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const blob = new Blob(["﻿" + rows.map((r) => r.map(esc).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/** Printed/sheet title block, matching the workbook header. */
function SheetTitle({ chapter, title }) {
  return (
    <div className="mb-4 overflow-hidden rounded-2xl text-center text-white" style={{ background: "linear-gradient(120deg,#0f1a55,#1a2a80)" }}>
      <p className="bg-white/10 py-2 text-lg font-semibold">iEagles {chapter} Chapter</p>
      <p className="py-2 text-sm font-medium tracking-wide text-[#f7b800]">{title}</p>
    </div>
  );
}

const th = "border border-[#d6dbe8] bg-[#e8ebf3] px-2 py-2 text-xs font-semibold uppercase tracking-wide text-[#1a2a80]";
const td = "border border-[#e2e7ef] px-2 py-1.5";
const numIn = "w-full min-w-[70px] rounded-lg border border-[#d6dbe8] bg-white px-2 py-1.5 text-right text-sm outline-none focus:border-[#1a2a80] focus:ring-2 focus:ring-[#1a2a80]/15";

/* ---------------- Weekly follow-up sheet ---------------- */

function WeeklySheet({ chapter, meetings, setMeetings }) {
  const [selected, setSelected] = useState(null);
  const [rows, setRows] = useState(null);
  const [date, setDate] = useState(isoDay(new Date()));
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setSelected(meetings.length ? meetings[meetings.length - 1].id : null);
  }, [chapter, meetings.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!selected) return setRows(null);
    setRows(null);
    setDirty(false);
    api(`/api/admin/meetings/${selected}`)
      .then((d) => setRows(d.rows))
      .catch((e) => setErr(e.message));
  }, [selected]);

  const meeting = meetings.find((m) => m.id === selected);

  async function addMeeting() {
    setErr("");
    setNote("");
    try {
      const d = await api("/api/admin/meetings", { method: "POST", body: { chapter, date } });
      setMeetings(d.meetings);
      setSelected(d.meeting.id);
    } catch (e) {
      setErr(e.message);
    }
  }

  async function save() {
    setBusy(true);
    setErr("");
    try {
      const d = await api(`/api/admin/meetings/${selected}`, { method: "PUT", body: { rows } });
      setRows(d.rows);
      setDirty(false);
      setNote(`Saved ${d.saved} rows.`);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`Delete Day ${meeting.day} (${fmtDate(meeting.date)}) and all its entries?`)) return;
    try {
      const d = await api(`/api/admin/meetings/${selected}`, { method: "DELETE" });
      setMeetings(d.meetings);
    } catch (e) {
      setErr(e.message);
    }
  }

  const setCell = (i, k, v) => {
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
    setDirty(true);
    setNote("");
  };

  const totals = useMemo(
    () =>
      rows &&
      Object.fromEntries(
        [["present"], ...FOLLOWUP_FIELDS.map((f) => [f.k])].map(([k]) => [k, rows.reduce((s, r) => s + (typeof r[k] === "boolean" ? (r[k] ? 1 : 0) : Number(r[k] || 0)), 0)])
      ),
    [rows]
  );

  function exportCsv() {
    const head = ["Sl.No", "Name", "Present", ...FOLLOWUP_FIELDS.map((f) => f.label)];
    const body = rows.map((r, i) => [i + 1, r.name, r.present ? "P" : "A", ...FOLLOWUP_FIELDS.map((f) => (f.flag ? (r[f.k] ? "Yes" : "") : r[f.k]))]);
    downloadCsv(`iEagles-${chapter}-Weekly-Day${meeting.day}-${isoDay(meeting.date)}.csv`, [[`iEagles ${chapter} Chapter`], [`Weekly Follow Up Sheet - Day ${meeting.day} (${fmtDate(meeting.date)})`], [], head, ...body]);
  }

  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap items-end gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#e2e7ef]">
        <div className="flex flex-1 flex-wrap gap-2">
          {meetings.length ? (
            meetings.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`rounded-xl border-0 px-3 py-2 text-sm font-semibold ${m.id === selected ? "bg-[#1a2a80] text-white" : "bg-[#f0f2f7] text-[#1a2a80] hover:bg-[#e2e7ef]"}`}
              >
                Day {m.day} <span className="font-normal opacity-75">· {shortDate(m.date)}</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-[#5b6675]">No meetings yet for this chapter. Add the first one →</p>
          )}
        </div>
        <div className="flex items-end gap-2">
          <label className="grid gap-1 text-xs font-semibold text-[#1a2a80]">
            New meeting date
            <input type="date" className={`${inputCls} !w-auto`} value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <Btn variant="gold" onClick={addMeeting}><CalendarPlus size={16} /> Add meeting</Btn>
        </div>
      </div>
      <ErrorNote>{err}</ErrorNote>

      {meeting && (
        <div className="print-area rounded-2xl bg-white p-4 ring-1 ring-[#e2e7ef]">
          <SheetTitle chapter={chapter} title={`Weekly Follow Up Sheet - Day ${meeting.day} · ${fmtDate(meeting.date)}`} />
          {!rows ? (
            <p className="py-8 text-center text-[#5b6675]">Loading…</p>
          ) : !rows.length ? (
            <p className="py-8 text-center text-[#5b6675]">No active members in the {chapter} Chapter yet. Assign members to this chapter in the Members tab.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className={`${th} w-14`}>Sl.No</th>
                      <th className={`${th} text-left`}>Name</th>
                      <th className={th}>Present</th>
                      {FOLLOWUP_FIELDS.map((f) => (
                        <th key={f.k} className={th}>{f.label}{f.money ? " (₹)" : ""}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.memberId} className={r.present ? "" : "bg-[#fafbfd]"}>
                        <td className={`${td} text-center text-[#5b6675]`}>{i + 1}</td>
                        <td className={`${td} font-medium`}>
                          {r.name}
                          {r.updatedByMember && <CircleDot size={12} className="ml-1.5 inline text-[#f7b800]" aria-label="Entered by the member" />}
                          <span className="block text-xs text-[#5b6675]">{r.company}</span>
                        </td>
                        <td className={`${td} text-center`}>
                          <input type="checkbox" className="h-5 w-5 accent-[#1a2a80]" style={{ minWidth: 0 }} checked={r.present} onChange={(e) => setCell(i, "present", e.target.checked)} aria-label={`${r.name} present`} />
                        </td>
                        {FOLLOWUP_FIELDS.map((f) => (
                          <td key={f.k} className={`${td} text-center`}>
                            {f.flag ? (
                              <input type="checkbox" className="h-5 w-5 accent-[#f7b800]" style={{ minWidth: 0 }} checked={r[f.k]} onChange={(e) => setCell(i, f.k, e.target.checked)} aria-label={`${r.name} ${f.label}`} />
                            ) : (
                              <input type="number" min="0" step={f.money ? "1" : "1"} className={numIn} value={r[f.k] || ""} placeholder="0" onChange={(e) => setCell(i, f.k, e.target.value)} aria-label={`${r.name} ${f.label}`} />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#fff7df] font-semibold text-[#1a2a80]">
                      <td className={td} />
                      <td className={td}>Total</td>
                      <td className={`${td} text-center`}>{totals.present} / {rows.length}</td>
                      {FOLLOWUP_FIELDS.map((f) => (
                        <td key={f.k} className={`${td} text-right`}>{f.money ? inr(totals[f.k]) : totals[f.k]}</td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-[#5b6675]">
                <CircleDot size={12} className="text-[#f7b800]" /> Row last updated by the member themselves.
              </p>
              <div className="no-print mt-4 flex flex-wrap items-center justify-between gap-3">
                <Btn variant="danger" onClick={remove}><Trash2 size={16} /> Delete meeting</Btn>
                <div className="flex flex-wrap items-center gap-2">
                  {note && <span className="text-sm text-[#14532d]">{note}</span>}
                  {dirty && <span className="text-sm text-[#8a5a00]">Unsaved changes</span>}
                  <Btn variant="ghost" onClick={exportCsv}><Download size={16} /> Excel (CSV)</Btn>
                  <Btn variant="ghost" onClick={() => window.print()}><Printer size={16} /> Print</Btn>
                  <Btn disabled={busy || !dirty} onClick={save}><Save size={16} /> {busy ? "Saving…" : "Save sheet"}</Btn>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Attendance ---------------- */

function Attendance({ chapter, report }) {
  const blocks = Math.max(1, Math.ceil(report.meetings.length / 16));
  const [block, setBlock] = useState(blocks - 1);
  useEffect(() => setBlock(blocks - 1), [blocks]);
  const start = block * 16;
  const days = Array.from({ length: 16 }, (_, i) => report.meetings[start + i] ?? null);

  function exportCsv() {
    const head = ["Sl.No", "Name", "DoJ", "TND", "TNA", ...report.meetings.map((m) => `Day ${m.day} (${isoDay(m.date)})`)];
    const body = report.members.map((m, i) => [i + 1, m.name, isoDay(m.joinedAt), m.tnd, m.tna, ...m.days.map((d) => (d === null ? "-" : d))]);
    downloadCsv(`iEagles-${chapter}-Attendance.csv`, [[`iEagles ${chapter} Chapter`], ["iEagles Attendance Sheet"], [], head, ...body]);
  }

  return (
    <div className="print-area rounded-2xl bg-white p-4 ring-1 ring-[#e2e7ef]">
      <SheetTitle chapter={chapter} title="iEagles Attendance Sheet" />
      <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: blocks }, (_, b) => (
            <button key={b} onClick={() => setBlock(b)} className={`rounded-lg border-0 px-3 py-1.5 text-xs font-semibold ${b === block ? "bg-[#1a2a80] text-white" : "bg-[#f0f2f7] text-[#1a2a80]"}`}>
              Days {b * 16 + 1}–{b * 16 + 16}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={exportCsv}><Download size={16} /> Excel (CSV)</Btn>
          <Btn variant="ghost" onClick={() => window.print()}><Printer size={16} /> Print</Btn>
        </div>
      </div>
      {!report.members.length ? (
        <p className="py-8 text-center text-[#5b6675]">No active members in this chapter yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-sm">
            <thead>
              <tr>
                <th className={`${th} w-12`}>Sl.No</th>
                <th className={`${th} text-left`}>Name</th>
                <th className={th} title="Date of Joining">DoJ</th>
                <th className={th} title="Total No. of Days (meetings since joining)">TND</th>
                <th className={th} title="Total No. Attended">TNA</th>
                {days.map((m, i) => (
                  <th key={i} className={`${th} w-11 !px-1`} title={m ? fmtDate(m.date) : ""}>
                    Day {start + i + 1}
                    {m && <span className="block text-[10px] font-normal normal-case text-[#5b6675]">{shortDate(m.date)}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {report.members.map((m, i) => (
                <tr key={m.id}>
                  <td className={`${td} text-center text-[#5b6675]`}>{i + 1}</td>
                  <td className={`${td} font-medium`}>{m.name}</td>
                  <td className={`${td} whitespace-nowrap text-center`}>{fmtDate(m.joinedAt)}</td>
                  <td className={`${td} text-center font-semibold`}>{m.tnd}</td>
                  <td className={`${td} text-center font-semibold text-[#14532d]`}>
                    {m.tna}
                    {m.attendancePct !== null && <span className="block text-[10px] font-normal text-[#5b6675]">{m.attendancePct}%</span>}
                  </td>
                  {days.map((_, j) => {
                    const v = m.days[start + j];
                    return (
                      <td key={j} className={`${td} text-center font-bold ${v === "P" ? "bg-[#ecfdf3] text-[#14532d]" : v === "A" ? "bg-[#fef2f2] text-[#b91c1c]" : v === null ? "bg-[#f0f2f7] text-[#c3c9d6]" : ""}`}>
                        {v === null ? "–" : v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-xs text-[#5b6675]">P = present · A = absent · – = before date of joining · TND = total meetings since joining · TNA = meetings attended</p>
    </div>
  );
}

/* ---------------- Compiled ---------------- */

function Compiled({ chapter, report }) {
  const sum = (k) => report.members.reduce((s, m) => s + (m.totals[k] || 0), 0);
  function exportCsv() {
    const head = ["Sl.No", "Name", ...FOLLOWUP_FIELDS.map((f) => f.label)];
    const body = report.members.map((m, i) => [i + 1, m.name, ...FOLLOWUP_FIELDS.map((f) => m.totals[f.k])]);
    downloadCsv(`iEagles-${chapter}-Compiled-Follow-Up.csv`, [[`iEagles ${chapter} Chapter`], [`Weekly Follow Up Sheet - Consecutive (${report.meetings.length} meetings)`], [], head, ...body]);
  }
  return (
    <div className="print-area rounded-2xl bg-white p-4 ring-1 ring-[#e2e7ef]">
      <SheetTitle chapter={chapter} title={`Weekly Follow Up Sheet - Consecutive · ${report.meetings.length} meeting${report.meetings.length === 1 ? "" : "s"}`} />
      <div className="no-print mb-3 flex justify-end gap-2">
        <Btn variant="ghost" onClick={exportCsv}><Download size={16} /> Excel (CSV)</Btn>
        <Btn variant="ghost" onClick={() => window.print()}><Printer size={16} /> Print</Btn>
      </div>
      {!report.members.length ? (
        <p className="py-8 text-center text-[#5b6675]">No active members in this chapter yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr>
                <th className={`${th} w-14`}>Sl.No</th>
                <th className={`${th} text-left`}>Name</th>
                {FOLLOWUP_FIELDS.map((f) => <th key={f.k} className={th}>{f.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {report.members.map((m, i) => (
                <tr key={m.id}>
                  <td className={`${td} text-center text-[#5b6675]`}>{i + 1}</td>
                  <td className={`${td} font-medium`}>{m.name}</td>
                  {FOLLOWUP_FIELDS.map((f) => (
                    <td key={f.k} className={`${td} text-right`}>{f.money ? inr(m.totals[f.k]) : m.totals[f.k]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#fff7df] font-semibold text-[#1a2a80]">
                <td className={td} />
                <td className={td}>Chapter total</td>
                {FOLLOWUP_FIELDS.map((f) => <td key={f.k} className={`${td} text-right`}>{f.money ? inr(sum(f.k)) : sum(f.k)}</td>)}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------- Categories ---------------- */

function Categories({ chapter }) {
  const [list, setList] = useState(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [err, setErr] = useState("");

  const load = useCallback(() => {
    api(`/api/admin/reports?chapter=${encodeURIComponent(chapter)}&type=categories`)
      .then((d) => setList(d.categories))
      .catch((e) => setErr(e.message));
  }, [chapter]);
  useEffect(load, [load]);

  async function add(e) {
    e.preventDefault();
    setErr("");
    try {
      await api("/api/admin/categories", { method: "POST", body: { name } });
      setName("");
      load();
    } catch (e2) {
      setErr(e2.message);
    }
  }
  async function rename(id) {
    setErr("");
    try {
      await api(`/api/admin/categories/${id}`, { method: "PATCH", body: { name: editing.name } });
      setEditing(null);
      load();
    } catch (e) {
      setErr(e.message);
    }
  }
  async function remove(c) {
    if (!confirm(`Delete the category "${c.name}"? Members holding it will be cleared.`)) return;
    try {
      await api(`/api/admin/categories/${c.id}`, { method: "DELETE" });
      load();
    } catch (e) {
      setErr(e.message);
    }
  }
  function exportCsv() {
    downloadCsv(`iEagles-${chapter}-Category-List.csv`, [
      ["iEagles Business Network"],
      [`${chapter} Chapter`],
      ["List of Category"],
      [],
      ["Sl.No", "Category", ...Array.from({ length: CATEGORY_SLOTS }, (_, i) => i + 1)],
      ...list.map((c) => [c.sl, c.name, ...Array.from({ length: CATEGORY_SLOTS }, (_, i) => c.members[i] ?? "")]),
    ]);
  }

  return (
    <div className="print-area rounded-2xl bg-white p-4 ring-1 ring-[#e2e7ef]">
      <div className="mb-4 overflow-hidden rounded-2xl text-center text-white" style={{ background: "linear-gradient(120deg,#0f1a55,#1a2a80)" }}>
        <p className="bg-white/10 py-2 text-lg font-semibold">iEagles Business Network</p>
        <p className="py-1 text-sm">{chapter} Chapter</p>
        <p className="pb-2 text-sm font-medium tracking-wide text-[#f7b800]">List of Category</p>
      </div>
      <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-2">
        <form onSubmit={add} className="flex flex-1 gap-2">
          <input className={`${inputCls} max-w-sm`} placeholder="Add a new business category" value={name} onChange={(e) => setName(e.target.value)} />
          <Btn type="submit" variant="gold"><Plus size={16} /> Add</Btn>
        </form>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={exportCsv} disabled={!list}><Download size={16} /> Excel (CSV)</Btn>
          <Btn variant="ghost" onClick={() => window.print()}><Printer size={16} /> Print</Btn>
        </div>
      </div>
      <ErrorNote>{err}</ErrorNote>
      {!list ? (
        <p className="py-8 text-center text-[#5b6675]">Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr>
                <th className={`${th} w-14`}>Sl.No</th>
                <th className={`${th} text-left`}>Category</th>
                {Array.from({ length: CATEGORY_SLOTS }, (_, i) => <th key={i} className={`${th} w-[19%]`}>{i + 1}</th>)}
                <th className={`${th} no-print w-24`} />
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id}>
                  <td className={`${td} text-center text-[#5b6675]`}>{c.sl}</td>
                  <td className={`${td} font-medium`}>
                    {editing?.id === c.id ? (
                      <span className="flex gap-1">
                        <input className="w-full rounded-lg border border-[#d6dbe8] px-2 py-1" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} autoFocus />
                        <button onClick={() => rename(c.id)} className="rounded-lg border-0 bg-[#ecfdf3] px-2 text-[#14532d]" aria-label="Save"><Check size={14} /></button>
                        <button onClick={() => setEditing(null)} className="rounded-lg border-0 bg-[#f0f2f7] px-2" aria-label="Cancel"><X size={14} /></button>
                      </span>
                    ) : (
                      c.name
                    )}
                  </td>
                  {Array.from({ length: CATEGORY_SLOTS }, (_, i) => (
                    <td key={i} className={`${td} ${c.members[i] ? "font-medium text-[#1a2a80]" : ""}`}>{c.members[i] ?? ""}</td>
                  ))}
                  <td className={`${td} no-print whitespace-nowrap text-right`}>
                    <button onClick={() => setEditing({ id: c.id, name: c.name })} className="mr-1 rounded-lg border-0 bg-[#f0f2f7] p-1.5 text-[#1a2a80]" aria-label={`Rename ${c.name}`}><Pencil size={13} /></button>
                    <button onClick={() => remove(c)} className="rounded-lg border-0 bg-[#fef2f2] p-1.5 text-[#b91c1c]" aria-label={`Delete ${c.name}`}><Trash2 size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-xs text-[#5b6675]">Members appear here from the business category set on their profile (Members tab → Edit). Up to {CATEGORY_SLOTS} per category.</p>
    </div>
  );
}

/* ---------------- Shell ---------------- */

const VIEWS = [
  { id: "weekly", label: "Weekly Follow Up", icon: ClipboardList },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "compiled", label: "Compiled Follow Up", icon: Sigma },
  { id: "categories", label: "List of Category", icon: Tags },
];

export default function ChapterForms() {
  const [chapter, setChapter] = useState(CHAPTERS[0].name);
  const [view, setView] = useState("weekly");
  const [meetings, setMeetings] = useState([]);
  const [report, setReport] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    api(`/api/admin/meetings?chapter=${encodeURIComponent(chapter)}`)
      .then((d) => setMeetings(d.meetings))
      .catch((e) => setErr(e.message));
  }, [chapter]);

  useEffect(() => {
    if (view !== "attendance" && view !== "compiled") return;
    setReport(null);
    api(`/api/admin/reports?chapter=${encodeURIComponent(chapter)}`)
      .then(setReport)
      .catch((e) => setErr(e.message));
  }, [chapter, view, meetings]);

  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#1a2a80]">
          Chapter
          <select className={`${inputCls} !w-auto`} value={chapter} onChange={(e) => setChapter(e.target.value)}>
            {CHAPTERS.map((c) => <option key={c.slug}>{c.name}</option>)}
          </select>
        </label>
        <div className="flex flex-wrap gap-1 rounded-xl bg-white p-1 ring-1 ring-[#e2e7ef]">
          {VIEWS.map((v) => (
            <button key={v.id} onClick={() => setView(v.id)} className={`inline-flex items-center gap-1.5 rounded-lg border-0 px-3 py-2 text-sm font-semibold ${view === v.id ? "bg-[#f7b800] text-[#1a2a80]" : "bg-transparent text-[#5b6675] hover:text-[#1a2a80]"}`}>
              <v.icon size={15} /> {v.label}
            </button>
          ))}
        </div>
      </div>
      <ErrorNote>{err}</ErrorNote>
      {view === "weekly" && <WeeklySheet chapter={chapter} meetings={meetings} setMeetings={setMeetings} />}
      {(view === "attendance" || view === "compiled") &&
        (!report ? <p className="py-10 text-center text-[#5b6675]">Loading…</p> : view === "attendance" ? <Attendance chapter={chapter} report={report} /> : <Compiled chapter={chapter} report={report} />)}
      {view === "categories" && <Categories chapter={chapter} />}
    </div>
  );
}
