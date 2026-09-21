"use client";
import { useEffect, useState } from "react";
import { MapPin, MessageCircle, RotateCcw, SearchX } from "lucide-react";
import { AREAS, BUSINESSES, CATEGORIES, SITE, STATES } from "@/lib/data";

const empty = { state: "", district: "", area: "", category: "", company: "" };
const field =
  "w-full rounded-lg border border-[#e2e7ef] bg-[#f6f8fb] px-3 py-2.5 outline-none focus:border-[#1a2a80] focus:bg-white disabled:opacity-50";

export default function BusinessExplorer() {
  const [f, setF] = useState(empty);

  // Pre-fill filters from the hero search (?q=&state=&category=)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const state = STATES[p.get("state")] ? p.get("state") : "";
    const category = CATEGORIES.includes(p.get("category")) ? p.get("category") : "";
    setF((prev) => ({ ...prev, state, category, company: p.get("q") || "" }));
  }, []);

  const set = (k) => (e) => {
    const v = e.target.value;
    setF((p) => ({ ...p, [k]: v, ...(k === "state" ? { district: "" } : {}) }));
  };

  const results = BUSINESSES.filter(
    (b) =>
      (!f.state || b.state === f.state) &&
      (!f.district || b.district === f.district) &&
      (!f.area || b.area === f.area) &&
      (!f.category || b.category === f.category) &&
      (!f.company || b.name.toLowerCase().includes(f.company.toLowerCase()))
  );
  const active = Object.values(f).some(Boolean);

  return (
    <>
      <div className="mb-8 rounded-2xl border border-[#e2e7ef] bg-white p-5 shadow-lg">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select className={field} value={f.state} onChange={set("state")}>
            <option value="">All States</option>
            {Object.keys(STATES).map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className={field} value={f.district} onChange={set("district")} disabled={!f.state}>
            <option value="">All Districts</option>
            {(STATES[f.state] || []).map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className={field} value={f.area} onChange={set("area")}>
            <option value="">Important Areas</option>
            {AREAS.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select className={field} value={f.category} onChange={set("category")}>
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input className={field} placeholder="Search company" value={f.company} onChange={set("company")} />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-[#5b6675]">
          <span><b className="text-[#1a2a80]">{results.length}</b> {results.length === 1 ? "business" : "businesses"} found</span>
          {active && (
            <button onClick={() => setF(empty)} className="inline-flex items-center gap-1 font-semibold text-[#1a2a80]">
              <RotateCcw size={14} /> Reset filters
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((b) => (
          <div key={b.name} className="rounded-2xl border border-[#e2e7ef] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1a2a80] text-xl font-semibold text-[#f7b800]">
                {b.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg">{b.name}</h3>
                <span className="rounded-full bg-[#f7b800]/20 px-3 py-0.5 text-xs font-semibold text-[#1a2a80]">{b.category}</span>
              </div>
            </div>
            <p className="mb-4 flex items-start gap-2 text-sm text-[#5b6675]">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {b.area}, {b.district}, {b.state}
            </p>
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2a80]"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`I would like to connect with ${b.name}`)}`}
            >
              <MessageCircle size={16} /> Connect
            </a>
          </div>
        ))}
      </div>

      {!results.length && (
        <div className="rounded-2xl border border-dashed border-[#e2e7ef] bg-white py-16 text-center text-[#5b6675]">
          <SearchX className="mx-auto mb-3" size={36} />
          No businesses match these filters.
        </div>
      )}

      <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl px-8 py-8 text-[#1a2a80] md:flex-row" style={{ background: "linear-gradient(120deg,#f7b800,#ffd54a)" }}>
        <div>
          <h3 className="text-2xl">Want your business listed?</h3>
          <p className="opacity-80">Message us on WhatsApp — {SITE.whatsappDisplay}</p>
        </div>
        <a className="inline-flex items-center gap-2 rounded-lg bg-[#1a2a80] px-6 py-3 font-medium text-white" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${SITE.whatsapp}`}>
          <MessageCircle size={18} /> WA: {SITE.whatsappDisplay}
        </a>
      </div>
    </>
  );
}
