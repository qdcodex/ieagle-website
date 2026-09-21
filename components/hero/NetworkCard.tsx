"use client";
import { useEffect, useState } from "react";
import { Building2, MapPin, Users } from "lucide-react";

// Sample activity — replace with real data later.
const FEED = [
  { icon: Users, text: "New member joined", meta: "Ernakulam, Kerala" },
  { icon: Building2, text: "Business listed: Sample Traders", meta: "Retail · Kerala" },
  { icon: MapPin, text: "Chapter meet announced", meta: "Chennai, Tamil Nadu" },
  { icon: Building2, text: "Business listed: Sample Infotech", meta: "IT Services · Karnataka" },
];

// Node positions on a 300x200 canvas; index 0 is the hub.
const NODES: [number, number][] = [
  [150, 100], [55, 45], [245, 40], [40, 150], [255, 155], [150, 25], [150, 178], [95, 100], [210, 100],
];
const EDGES: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [1, 5], [5, 2], [3, 6], [6, 4], [7, 1], [8, 2]];

export default function NetworkCard() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % FEED.length), 3200);
    return () => clearInterval(t);
  }, []);
  const item = FEED[i];
  const Icon = item.icon;

  return (
    <div className="liquid-glass w-full max-w-md rounded-2xl border border-white/20 p-5 text-white">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-white/80">
        <span>Our network</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="ping absolute inline-flex h-full w-full rounded-full bg-green-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Live
        </span>
      </div>

      <svg viewBox="0 0 300 200" className="w-full" role="img" aria-label="Network of connected businesses">
        {EDGES.map(([a, b], k) => (
          <line key={k} className="edge" x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke="rgba(255,255,255,.4)" strokeWidth="1" />
        ))}
        {NODES.map(([x, y], k) => (
          <circle
            key={k}
            className="node-pulse"
            cx={x}
            cy={y}
            r={k === 0 ? 9 : 5}
            fill={k === 0 ? "#f7b800" : "#fff"}
            style={{ animationDelay: `${k * 0.3}s` }}
          />
        ))}
      </svg>

      <div className="mb-3 grid grid-cols-3 gap-2 text-center">
        {[["25+", "States"], ["200+", "Districts"], ["1,000+", "Members"]].map(([n, l]) => (
          <div key={l} className="rounded-lg bg-white/10 py-2">
            <div className="text-lg font-semibold text-[#f7b800]">{n}</div>
            <div className="text-[11px] uppercase tracking-wider text-white/70">{l}</div>
          </div>
        ))}
      </div>

      <div key={i} className="feed-in flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7b800] text-[#1a2a80]">
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{item.text}</p>
          <p className="truncate text-xs text-white/70">{item.meta}</p>
        </div>
      </div>
    </div>
  );
}
