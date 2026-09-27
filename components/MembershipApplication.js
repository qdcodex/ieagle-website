"use client";
import { useEffect, useState } from "react";
import { Send, Mail, Printer, RefreshCw, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/data";
import { MEMBERSHIP } from "@/lib/content";

// Form layout mirrors the printed iEagles membership application.
const SECTIONS = [
  {
    title: "Membership Details",
    fields: [
      { k: "name", label: "Name", required: true, autoComplete: "name" },
      { k: "category", label: "Category", required: true, type: "select" },
      { k: "company", label: "Company Name", required: true, autoComplete: "organization" },
      { k: "designation", label: "Designation", autoComplete: "organization-title" },
      {
        k: "gst",
        label: "GST",
        placeholder: "Optional — 15 character GSTIN",
        pattern: "[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z][0-9A-Za-z]Z[0-9A-Za-z]",
        title: "Enter a valid 15-character GSTIN, e.g. 33ABCDE1234F1Z5",
        upper: true,
      },
    ],
  },
  {
    title: "Communication Address",
    fields: [
      { k: "address", label: "Address", required: true, autoComplete: "street-address" },
      {
        k: "district",
        label: "District with Pin",
        required: true,
        placeholder: "e.g. Kanyakumari – 629001",
        pattern: ".*\\b[0-9]{6}\\b.*",
        title: "Include the district name and the 6-digit PIN code",
      },
      { k: "contact", label: "Contact", required: true, type: "tel", autoComplete: "tel", pattern: "(\\+?91 ?)?[6-9][0-9]{4} ?[0-9]{5}", title: "Enter a 10-digit mobile number, e.g. 98765 43210" },
      { k: "email", label: "E-Mail Id", required: true, type: "email", autoComplete: "email" },
    ],
  },
  {
    title: "Business Details",
    fields: [
      { k: "products", label: "Products/Services", required: true, type: "textarea" },
      { k: "audience", label: "Targeted Audiences", type: "textarea" },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.fields);
const blank = Object.fromEntries(ALL.map((f) => [f.k, ""]));

const pad = (n) => String(n).padStart(2, "0");
function newApplication() {
  const d = new Date();
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return {
    no: `IEBN-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${rand}`,
    date: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`,
  };
}

const cell = "flex min-h-[46px] rounded-xl border border-[#1a2a80]/25 bg-white focus-within:border-[#1a2a80] focus-within:ring-4 focus-within:ring-[#1a2a80]/10";
// Label cell: full-width strip on phones, fixed-width grey column (as on the paper form) from sm up
const label =
  "flex w-full shrink-0 items-center rounded-t-xl border-b border-[#1a2a80]/20 bg-[#e8ebf3] px-4 py-2 text-sm font-semibold text-[#1a2a80] sm:w-48 sm:self-stretch sm:rounded-l-xl sm:rounded-tr-none sm:border-b-0 sm:border-r";
const control = "w-full min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-[#1c2430] outline-none";

export default function MembershipApplication() {
  const [app, setApp] = useState({ no: "", date: "" });
  const [f, setF] = useState(blank);
  const [done, setDone] = useState("");
  const [saved, setSaved] = useState(false); // stored in the iEagles database
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setApp(newApplication());
    // Preview the next sequential number from the database (final number is assigned on submit)
    fetch("/api/applications/next")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.applicationNo && setApp((a) => ({ ...a, no: d.applicationNo })))
      .catch(() => {});
    // Preselect from ?category= if that category is open, else the only open one
    const open = MEMBERSHIP.categories.filter((x) => x.available);
    const c = new URLSearchParams(window.location.search).get("category");
    const pick = open.find((x) => x.t === c) ?? (open.length === 1 ? open[0] : null);
    if (pick) setF((p) => ({ ...p, category: pick.t }));
  }, []);

  const set = (field) => (e) => {
    const v = field.upper ? e.target.value.toUpperCase() : e.target.value;
    setF((p) => ({ ...p, [field.k]: v }));
  };

  const summary = (no = app.no) =>
    [
      "*iEagles Business Network — Membership Application*",
      `Application No.: ${no}`,
      `Date: ${app.date}`,
      ...SECTIONS.flatMap((s) => ["", `*${s.title}*`, ...s.fields.map((x) => `${x.label}: ${f[x.k] || "—"}`)]),
    ].join("\n");

  async function submit(e) {
    e.preventDefault();
    if (saved || busy) return;
    setErr("");
    setBusy(true);
    // Open the WhatsApp tab now (inside the click) so pop-up blockers allow it; fill it in after saving.
    const tab = window.open("", "_blank");
    let no = app.no;
    try {
      const r = await fetch("/api/applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const d = await r.json().catch(() => ({}));
      if (r.status === 400) {
        tab?.close();
        setErr(d.error || "Please check the form.");
        setBusy(false);
        return;
      }
      if (r.ok && d.applicationNo) {
        no = d.applicationNo;
        setApp((a) => ({ ...a, no }));
        setSaved(true);
      }
    } catch {
      // database not reachable (e.g. hosted site without the local DB) — still send via WhatsApp
    }
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(summary(no))}`;
    if (tab) {
      tab.opener = null;
      tab.location.href = url;
    } else window.open(url, "_blank", "noopener");
    setDone("whatsapp");
    setBusy(false);
  }

  function email(e) {
    const form = e.currentTarget.form;
    if (!form.reportValidity()) return;
    const subject = `Membership Application ${app.no} — ${f.name}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary().replace(/\*/g, ""))}`;
    setDone("email");
  }

  function reset() {
    const open = MEMBERSHIP.categories.filter((x) => x.available);
    setF({ ...blank, category: open.length === 1 ? open[0].t : "" });
    setApp(newApplication());
    setDone("");
    setSaved(false);
    setErr("");
    fetch("/api/applications/next")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.applicationNo && setApp((a) => ({ ...a, no: d.applicationNo })))
      .catch(() => {});
  }

  return (
    <form onSubmit={submit} className="print-area overflow-hidden rounded-3xl border border-[#1a2a80]/15 bg-[#f4f6fb] shadow-2xl">
      <div className="flex items-center justify-between gap-4 bg-[#1a2a80] px-6 py-3.5 text-white">
        <h2 className="!text-lg !text-white">Kindly complete all the details</h2>
        <img src="/logo.png" alt="iEagles" className="h-9 w-auto" />
      </div>

      {/* Application no. + date (automatic) */}
      <div className="grid gap-3 px-6 py-5 sm:grid-cols-2">
        <label className="flex items-center gap-3">
          <span className="shrink-0 font-semibold text-[#1a2a80]">Application No.</span>
          <input readOnly value={app.no} aria-label="Application number" className="w-full min-w-0 rounded-xl border border-[#1a2a80]/25 bg-[#e8ebf3] px-4 py-2.5 font-mono font-semibold tracking-wide text-[#1a2a80] outline-none" />
        </label>
        <label className="flex items-center gap-3 sm:justify-end">
          <span className="shrink-0 font-semibold text-[#1a2a80]">Date</span>
          <input readOnly value={app.date} aria-label="Application date" className="w-full min-w-0 rounded-xl border border-[#1a2a80]/25 bg-[#e8ebf3] px-4 py-2.5 font-semibold text-[#1a2a80] outline-none sm:w-44" />
        </label>
      </div>

      {SECTIONS.map((s) => (
        <fieldset key={s.title} className="m-0 border-0 p-0">
          <legend className="w-full bg-[#1a2a80] px-6 py-2.5 font-semibold text-white">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#f7b800] align-middle" />
            {s.title}
          </legend>
          <div className="grid gap-3 px-6 py-5">
            {s.fields.map((x) => {
              const id = `app-${x.k}`;
              const common = {
                id,
                name: x.k,
                value: f[x.k],
                onChange: set(x),
                required: x.required,
                autoComplete: x.autoComplete,
                placeholder: x.placeholder,
                pattern: x.pattern,
                title: x.title,
              };
              return (
                <div key={x.k} className={`${cell} flex-col sm:flex-row ${x.type === "textarea" ? "" : "sm:items-center"}`}>
                  <label htmlFor={id} className={label}>
                    {x.label}
                    {x.required && <span className="ml-1 text-[#c2410c]">*</span>}
                  </label>
                  {x.type === "select" ? (
                    <select {...common} className={`${control} cursor-pointer`} style={{ minWidth: 0 }}>
                      <option value="">Select membership category</option>
                      {MEMBERSHIP.categories.map((c) => (
                        <option key={c.t} value={c.t} disabled={!c.available}>
                          {c.t} — {c.d}
                          {c.available ? "" : " (coming soon)"}
                        </option>
                      ))}
                    </select>
                  ) : x.type === "textarea" ? (
                    <textarea {...common} rows={3} className={`${control} resize-y`} style={{ minWidth: 0 }} />
                  ) : (
                    <input {...common} type={x.type ?? "text"} inputMode={x.type === "tel" ? "tel" : undefined} className={control} style={{ minWidth: 0 }} />
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="no-print flex flex-col gap-4 border-t border-[#1a2a80]/10 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#5b6675]">
          <span className="text-[#c2410c]">*</span> Required. Your application is sent to the iEagles team on WhatsApp.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-[#1a2a80]/25 bg-white px-4 py-3 text-sm font-semibold text-[#1a2a80] hover:bg-[#f4f6fb]">
            <Printer size={16} /> Print / PDF
          </button>
          <button type="button" onClick={email} className="inline-flex items-center gap-2 rounded-xl border border-[#1a2a80]/25 bg-white px-4 py-3 text-sm font-semibold text-[#1a2a80] hover:bg-[#f4f6fb]">
            <Mail size={16} /> Email
          </button>
          <button type="submit" disabled={busy || saved} className="inline-flex items-center gap-2 rounded-xl border-0 bg-[#1a2a80] px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2c3fa8] disabled:opacity-60">
            <Send size={18} /> {busy ? "Submitting…" : saved ? "Submitted" : "Submit Application"}
          </button>
        </div>
      </div>

      {err && (
        <p role="alert" className="no-print border-t border-[#1a2a80]/10 bg-[#fef2f2] px-6 py-3 text-sm text-[#991b1b]">{err}</p>
      )}
      {done && (
        <div className="no-print flex flex-col gap-3 border-t border-[#1a2a80]/10 bg-[#ecfdf3] px-6 py-4 text-[#14532d] sm:flex-row sm:items-center sm:justify-between" role="status">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={18} />
            {saved
              ? `Application ${app.no} received — we have saved it and opened WhatsApp so you can also send it to our team.`
              : `Application ${app.no} ${done === "email" ? "opened in your email app" : "opened in WhatsApp"} — please press send there to complete it.`}
          </span>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 border-0 bg-transparent text-sm font-semibold text-[#14532d] underline">
            <RefreshCw size={14} /> Start a new application
          </button>
        </div>
      )}
    </form>
  );
}
