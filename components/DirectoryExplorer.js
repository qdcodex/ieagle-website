"use client";
import { useState } from "react";
import { MapPin, Search, Building2 } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { Section, SectionTitle, cardCls } from "@/components/ui";
import { STATES } from "@/lib/data";

export default function DirectoryExplorer() {
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  const entries = Object.entries(STATES)
    .map(([state, districts]) => [state, districts.filter((d) => !s || d.toLowerCase().includes(s) || state.toLowerCase().includes(s))])
    .filter(([state, d]) => d.length);

  return (
    <>
      <div className="sticky top-16 z-20 border-b border-[#e2e7ef] bg-white/90 py-4 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6">
          <label className="relative block max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b6675]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search state or district…"
              className="w-full rounded-full border border-[#e2e7ef] bg-[#f6f8fb] py-2.5 pl-10 pr-4 outline-none focus:border-[#1a2a80]"
            />
          </label>
        </div>
      </div>

      <Section id="state">
        <SectionTitle eyebrow="Browse by" title="State" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([state, d], i) => (
            <Reveal key={state} delay={i * 70}>
              <div className={`${cardCls} h-full text-center`}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold"><MapPin size={26} /></div>
                <h3 className="text-xl">{state}</h3>
                <p className="text-[#5b6675]">{STATES[state].length} districts</p>
              </div>
            </Reveal>
          ))}
        </div>
        {!entries.length && <p>No matches found.</p>}
      </Section>

      <Section id="district" alt>
        <SectionTitle eyebrow="Browse by" title="District" />
        <div className="grid gap-6 md:grid-cols-2">
          {entries.map(([state, d], i) => (
            <Reveal key={state} delay={i * 70}>
              <div className="rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl"><Building2 size={20} className="text-gold" /> {state}</h3>
                <div className="flex flex-wrap gap-2">
                  {d.map((x) => (
                    <span key={x} className="rounded-full border border-[#e2e7ef] bg-white px-4 py-1.5 text-sm shadow-sm transition hover:border-transparent hover:bg-[#1a2a80] hover:text-white">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
