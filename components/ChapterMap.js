import Link from "next/link";
import { CHAPTERS } from "@/lib/data";

// Label placement per chapter so names don't overlap.
const LABEL = {
  karungal: { dx: -13, dy: 5, a: "end" },
  nagercoil: { dx: 14, dy: 5, a: "start" },
  thuckalay: { dx: 14, dy: 5, a: "start" },
  marthandam: { dx: 14, dy: 5, a: "start" },
  colachel: { dx: 0, dy: 26, a: "middle" },
  "monday-market": { dx: 13, dy: 17, a: "start" },
};

/** Schematic map of Kanyakumari District with clickable chapter pins. */
export default function ChapterMap({ active = undefined }) {
  return (
    <svg viewBox="0 0 480 350" className="h-auto w-full" role="img" aria-label="Kanyakumari District chapter map">
      <defs>
        <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c3fa8" />
          <stop offset="1" stopColor="#1a2a80" />
        </linearGradient>
        <pattern id="sea" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 Q2.5 2 5 5 T10 5" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="480" height="350" fill="url(#sea)" />
      <text x="40" y="318" fill="rgba(255,255,255,.35)" fontSize="13" fontStyle="italic" letterSpacing="2">ARABIAN SEA</text>
      <path
        d="M60,40 L140,30 L230,45 L310,70 L380,120 L425,190 L440,250 L420,318 L360,300 L300,272 L240,258 L180,248 L130,240 L95,220 L70,185 L52,140 L45,90 Z"
        fill="url(#land)"
        stroke="#f7b800"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text x="300" y="150" fill="rgba(255,255,255,.35)" fontSize="11" letterSpacing="1.5">KANYAKUMARI</text>
      <text x="315" y="164" fill="rgba(255,255,255,.35)" fontSize="11" letterSpacing="1.5">DISTRICT</text>
      <circle cx="420" cy="318" r="3" fill="rgba(255,255,255,.6)" />
      <text x="412" y="338" fill="rgba(255,255,255,.55)" fontSize="10" textAnchor="end">Cape Comorin</text>

      {/* links between chapters */}
      {CHAPTERS.map((c, i) =>
        CHAPTERS.slice(i + 1).map((d) => (
          <line key={`${c.slug}-${d.slug}`} x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="rgba(255,255,255,.14)" strokeWidth="1" strokeDasharray="3 4" />
        ))
      )}

      {CHAPTERS.map((c) => {
        const l = LABEL[c.slug] ?? { dx: 14, dy: 5, a: "start" };
        const on = active === c.slug;
        return (
          <Link key={c.slug} href={`/chapters/${c.slug}`} className="group cursor-pointer" aria-label={`${c.name} chapter`}>
            <circle cx={c.x} cy={c.y} r="16" fill="#f7b800" opacity={on ? 0.35 : 0} className="transition-opacity group-hover:opacity-30" />
            <circle cx={c.x} cy={c.y} r={on ? 9 : 7} fill={on ? "#fff" : "#f7b800"} stroke="#0f1a55" strokeWidth="2.5" />
            <text
              x={c.x + l.dx}
              y={c.y + l.dy}
              textAnchor={l.a}
              fill={on ? "#f7b800" : "#fff"}
              fontSize="14"
              fontWeight="600"
              className="transition-colors group-hover:fill-[#f7b800]"
              style={{ paintOrder: "stroke", stroke: "#0f1a55", strokeWidth: 3 }}
            >
              {c.name}
            </text>
          </Link>
        );
      })}
    </svg>
  );
}
