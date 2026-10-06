"use client";
import { useEffect, useState } from "react";
import { BookOpen, Download, CalendarDays } from "lucide-react";
import { MAGAZINE_YEARS, MAGAZINE_ISSUES } from "@/lib/content";

const yearFromHash = () => {
  const m = typeof window !== "undefined" && window.location.hash.match(/^#year-(\d{4})$/);
  return m && MAGAZINE_YEARS.includes(Number(m[1])) ? Number(m[1]) : null;
};

/** Published magazines, filtered by year. The year buttons in the page banner link to #year-2025 / #year-2026. */
export default function MagazineIssues() {
  const [year, setYear] = useState(MAGAZINE_YEARS[MAGAZINE_YEARS.length - 1]);

  useEffect(() => {
    const show = (y) => {
      setYear(y);
      document.getElementById("issues")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const fromHash = () => {
      const y = yearFromHash();
      if (y) show(y);
    };
    // The banner's year buttons are client-side links, which do not fire "hashchange",
    // so also react to clicks on any link pointing at #year-YYYY.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href*="#year-"]');
      const m = a?.getAttribute("href").match(/#year-(\d{4})$/);
      if (m && MAGAZINE_YEARS.includes(Number(m[1]))) show(Number(m[1]));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const issues = MAGAZINE_ISSUES.filter((i) => i.year === year);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="Magazine year">
        {MAGAZINE_YEARS.map((y) => (
          <button
            key={y}
            role="tab"
            aria-selected={y === year}
            onClick={() => {
              setYear(y);
              history.replaceState(null, "", `#year-${y}`);
            }}
            className={`inline-flex items-center gap-2 rounded-full border-0 px-6 py-2.5 text-base font-semibold transition ${
              y === year ? "bg-[#1a2a80] text-white shadow-lg" : "bg-[#f0f2f7] text-[#1a2a80] hover:bg-[#e2e7ef]"
            }`}
          >
            <CalendarDays size={17} className={y === year ? "text-[#f7b800]" : ""} /> {y}
            <span className={`rounded-full px-2 text-xs ${y === year ? "bg-[#f7b800] text-[#1a2a80]" : "bg-white text-[#5b6675]"}`}>
              {MAGAZINE_ISSUES.filter((i) => i.year === y).length}
            </span>
          </button>
        ))}
      </div>

      {issues.length ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {issues.map((it) => (
            <div key={it.id} className="flex flex-col gap-6 overflow-hidden rounded-3xl border border-[#e2e7ef] bg-[#f6f8fb] p-6 shadow-sm transition hover:shadow-xl sm:flex-row">
              <div
                className="relative flex h-60 w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-2xl p-5 text-white shadow-lg sm:w-44"
                style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 60%,#2c3fa8)" }}
              >
                <p className="self-start text-[10px] font-bold uppercase tracking-[0.25em] text-[#f7b800]">Brand Your Business</p>
                <img src="/logo.png" alt="" className="h-16 w-auto" />
                <div className="text-center">
                  <p className="text-xs uppercase tracking-widest text-[#f7b800]">{it.n}</p>
                  <p className="text-sm font-semibold">{it.label}</p>
                </div>
                <div className="h-1 w-12 rounded bg-[#f7b800]" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#f7b800]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a2a80]">
                  <BookOpen size={12} /> Magazine · {it.year}
                </span>
                <h3 className="mb-2 text-2xl">{it.label}</h3>
                <p className="mb-5 text-[#5b6675]">Entrepreneur profiles, member spotlights, business stories and opportunities from across the network.</p>
                <a className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#1a2a80] px-6 py-3 font-semibold text-white transition hover:bg-[#2c3fa8]" href={it.pdf}>
                  <Download size={18} /> Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#d6dbe8] bg-[#f6f8fb] px-6 py-14 text-center text-[#5b6675]">
          <BookOpen className="mx-auto mb-3 text-[#f7b800]" size={34} />
          <p className="text-lg font-semibold text-[#1a2a80]">No magazines published in {year} yet</p>
          <p className="mt-1 text-sm">Issues appear here as soon as they are published.</p>
        </div>
      )}
    </div>
  );
}
