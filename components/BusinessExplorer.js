"use client";
import { useEffect, useMemo, useState } from "react";
import { MapPin, MessageCircle, RotateCcw, SearchX, X, Globe, Building2, Briefcase, Package, Users, Phone } from "lucide-react";
import { BUSINESSES, INDUSTRIES, STATES, CHAPTERS, wa } from "@/lib/data";

const empty = { state: "", district: "", chapter: "", area: "", industry: "", company: "" };
const field =
  "w-full rounded-xl border border-[#e2e7ef] bg-[#f6f8fb] px-3 py-2.5 outline-none focus:border-[#1a2a80] focus:bg-white disabled:opacity-50";

const initials = (s) => s.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export default function BusinessExplorer() {
  const [f, setF] = useState(empty);
  const [open, setOpen] = useState(null);

  // Pre-fill from links such as the hero search (?q=&state=&category=&chapter=)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const get = (k, list) => (list.includes(p.get(k)) ? p.get(k) : "");
    setF((prev) => ({
      ...prev,
      state: get("state", STATES.map((s) => s.name)),
      industry: get("category", INDUSTRIES) || get("industry", INDUSTRIES),
      chapter: get("chapter", CHAPTERS.map((c) => c.name)),
      company: p.get("q") || "",
    }));
  }, []);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const districts = useMemo(() => (STATES.find((s) => s.name === f.state)?.districts ?? STATES.flatMap((s) => s.districts)).map((d) => d.name), [f.state]);
  const chapters = CHAPTERS.filter((c) => (!f.state || c.state === f.state) && (!f.district || c.district === f.district));
  const areas = [...new Set(BUSINESSES.map((b) => b.area))].sort();

  const set = (k) => (e) => {
    const v = e.target.value;
    setF((p) => ({ ...p, [k]: v, ...(k === "state" ? { district: "", chapter: "" } : k === "district" ? { chapter: "" } : {}) }));
  };

  const q = f.company.toLowerCase();
  const results = BUSINESSES.filter(
    (b) =>
      (!f.state || b.state === f.state) &&
      (!f.district || b.district === f.district) &&
      (!f.chapter || b.chapter === f.chapter) &&
      (!f.area || b.area === f.area) &&
      (!f.industry || b.industry === f.industry) &&
      (!q || [b.company, b.member, b.products].some((x) => x.toLowerCase().includes(q)))
  );
  const active = Object.values(f).some(Boolean);

  return (
    <>
      <div className="mb-8 rounded-3xl border border-[#e2e7ef] bg-white p-5 shadow-xl md:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <select className={field} value={f.state} onChange={set("state")} aria-label="State">
            <option value="">All States</option>
            {STATES.map((s) => <option key={s.name}>{s.name}</option>)}
          </select>
          <select className={field} value={f.district} onChange={set("district")} aria-label="District">
            <option value="">All Districts</option>
            {districts.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className={field} value={f.chapter} onChange={set("chapter")} aria-label="Chapter">
            <option value="">All Chapters</option>
            {chapters.map((c) => <option key={c.slug}>{c.name}</option>)}
          </select>
          <select className={field} value={f.area} onChange={set("area")} aria-label="Important areas">
            <option value="">Important Areas</option>
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select className={field} value={f.industry} onChange={set("industry")} aria-label="Category / industry">
            <option value="">All Categories</option>
            {INDUSTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input className={field} placeholder="Search company" value={f.company} onChange={set("company")} aria-label="Company" />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-[#5b6675]">
          <span><b className="text-[#1a2a80]">{results.length}</b> {results.length === 1 ? "business" : "businesses"} found</span>
          {active && (
            <button onClick={() => setF(empty)} className="inline-flex items-center gap-1 border-0 bg-transparent font-semibold text-[#1a2a80]">
              <RotateCcw size={14} /> Reset filters
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((b) => (
          <button
            key={b.company}
            onClick={() => setOpen(b)}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e2e7ef] bg-white p-0 text-left shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
          >
            <div className="relative h-20 w-full" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
              {b.sample && <span className="absolute right-3 top-3 rounded-full bg-[#f7b800] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1a2a80]">Sample</span>}
            </div>
            <div className="relative -mt-10 flex flex-1 flex-col px-6 pb-6">
              {b.photo ? (
                <img src={b.photo} alt={b.member} className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-lg" />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-[#f7b800] text-2xl font-semibold text-[#1a2a80] shadow-lg">
                  {initials(b.company)}
                </span>
              )}
              <h3 className="mt-4 text-xl">{b.company}</h3>
              <p className="text-sm font-medium text-[#1c2430]">{b.member} · <span className="text-[#5b6675]">{b.designation}</span></p>
              <span className="mt-3 w-fit rounded-full bg-[#1a2a80]/10 px-3 py-1 text-xs font-semibold text-[#1a2a80]">{b.industry}</span>
              <p className="mt-3 flex items-start gap-2 text-sm text-[#5b6675]"><MapPin size={16} className="mt-0.5 shrink-0" /> {b.area}, {b.chapter} Chapter</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a2a80]">View profile →</span>
            </div>
          </button>
        ))}
      </div>

      {!results.length && (
        <div className="rounded-3xl border border-dashed border-[#e2e7ef] bg-white py-16 text-center text-[#5b6675]">
          <SearchX className="mx-auto mb-3" size={36} />
          No businesses match these filters.
        </div>
      )}

      {/* Member digital profile */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={`${open.company} profile`}>
          <div className="max-h-[92dvh] w-full max-w-2xl overflow-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()} style={{ animation: "feedIn .25s ease both" }}>
            <div className="relative p-6 pb-16 text-white sm:p-8 sm:pb-16" style={{ background: "linear-gradient(135deg,#0f1a55,#1a2a80 60%,#2c3fa8)" }}>
              <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white/15 text-white hover:bg-white/25"><X size={20} /></button>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f7b800]">Member digital profile</p>
              {open.sample && <span className="mt-2 inline-block rounded-full bg-[#f7b800] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#1a2a80]">Sample listing</span>}
            </div>
            <div className="relative -mt-12 px-6 pb-8 sm:px-8">
              <div className="flex flex-col items-start gap-3">
                {open.photo ? (
                  <img src={open.photo} alt={open.member} className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-xl" />
                ) : (
                  <span className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#f7b800] text-3xl font-semibold text-[#1a2a80] shadow-xl">{initials(open.company)}</span>
                )}
                <div>
                  <h3 className="text-2xl">{open.member}</h3>
                  <p className="text-[#5b6675]">{open.designation}, {open.company}</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  [Building2, "Business Name", open.company],
                  [Users, "Chapter Name", `${open.chapter} Chapter`],
                  [Briefcase, "Industry", open.industry],
                  [Package, "Products / Services", open.products],
                  [MapPin, "Location", `${open.area}, ${open.district}, ${open.state}`],
                  [Globe, "Website / Social Media", open.website || "—"],
                ].map(([Icon, k, v]) => (
                  <div key={k} className="rounded-xl bg-[#f6f8fb] p-3">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5b6675]"><Icon size={13} /> {k}</dt>
                    <dd className="mt-0.5 font-medium text-[#1a2a80]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 rounded-xl bg-[#f6f8fb] p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5b6675]">Business Description</p>
                <p className="mt-0.5 text-[#1c2430]">{open.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={wa(`I would like to connect with ${open.company} (${open.member})`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-5 py-3 font-semibold text-white">
                  <MessageCircle size={18} /> Connect on WhatsApp
                </a>
                {open.phone && (
                  <a href={`tel:${open.phone}`} className="inline-flex items-center gap-2 rounded-xl bg-[#1a2a80] px-5 py-3 font-semibold text-white"><Phone size={18} /> Call</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
