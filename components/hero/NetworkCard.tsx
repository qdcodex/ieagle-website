"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { CHAPTERS } from "@/lib/data";
import { CHAPTERS_INFO, BRAND } from "@/lib/content";

/** Compact floating card beside the 3D globe: pillars + rotating chapter link. */
export default function NetworkCard() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % CHAPTERS.length), 3000);
    return () => clearInterval(t);
  }, []);
  const c = CHAPTERS[i];

  return (
    <div className="liquid-glass w-full rounded-2xl border border-white/20 p-4 text-white shadow-2xl">
      <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-widest text-white/80">
        <span>{CHAPTERS.length} chapters · Kanyakumari</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="ping absolute inline-flex h-full w-full rounded-full bg-[#f7b800]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f7b800]" />
          </span>
          Growing
        </span>
      </div>

      <Link key={c.slug} href={`/chapters/${c.slug}`} className="feed-in flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 transition hover:bg-white/20">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7b800] text-[#1a2a80]">
          <MapPin size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{c.name} Chapter</p>
          <p className="truncate text-xs text-white/70">{CHAPTERS_INFO.chapterTagline}</p>
        </div>
        <ArrowRight size={16} className="shrink-0 text-white/70" />
      </Link>

      <p className="mt-3 text-center text-xs tracking-[0.2em] text-[#f7b800]">{BRAND.pillars.join(" • ").toUpperCase()}</p>
    </div>
  );
}
