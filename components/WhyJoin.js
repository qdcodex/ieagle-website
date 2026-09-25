import { Users, Handshake, Lightbulb, Search, Puzzle, TrendingUp, Sparkles, ArrowDown } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { WHY_JOIN } from "@/lib/content";

const ICONS = [Users, Handshake, Lightbulb, Search, Puzzle, TrendingUp, Sparkles];

/** Section 18 "Why join" journey, drawn as a rising staircase on desktop and a vertical flow on mobile. */
export default function WhyJoin({ light = false }) {
  const n = WHY_JOIN.steps.length;
  return (
    <div>
      {/* desktop staircase */}
      <div className="hidden items-end gap-3 lg:flex">
        {WHY_JOIN.steps.map((s, i) => {
          const Icon = ICONS[i];
          const last = i === n - 1;
          return (
            <Reveal key={s} delay={i * 100} className="flex-1">
              <div
                className={`flex flex-col items-center justify-end rounded-t-2xl px-3 pb-5 pt-6 text-center ${
                  last ? "bg-[#f7b800] text-[#1a2a80]" : light ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white text-[#1a2a80] ring-1 ring-[#e2e7ef]"
                }`}
                style={{ height: 150 + i * 32 }}
              >
                <span className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${last ? "bg-[#1a2a80] text-[#f7b800]" : "bg-[#f7b800] text-[#1a2a80]"}`}>
                  <Icon size={22} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 font-semibold leading-tight">{s}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
      {/* mobile / tablet vertical flow */}
      <ol className="m-0 flex list-none flex-col items-center p-0 lg:hidden">
        {WHY_JOIN.steps.map((s, i) => {
          const Icon = ICONS[i];
          const last = i === n - 1;
          return (
            <li key={s} className="flex w-full max-w-sm flex-col items-center">
              <Reveal className="w-full">
                <div className={`flex items-center gap-4 rounded-2xl px-5 py-4 shadow-sm ${last ? "bg-[#f7b800] text-[#1a2a80]" : light ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white text-[#1a2a80] ring-1 ring-[#e2e7ef]"}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${last ? "bg-[#1a2a80] text-[#f7b800]" : "bg-[#f7b800] text-[#1a2a80]"}`}>
                    <Icon size={20} />
                  </span>
                  <span className="text-lg font-semibold">{s}</span>
                </div>
              </Reveal>
              {!last && <ArrowDown className="my-1.5 text-[#f7b800]" size={20} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
