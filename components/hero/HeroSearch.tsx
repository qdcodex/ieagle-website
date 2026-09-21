"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, STATES } from "@/lib/data";

const field =
  "w-full min-w-0 rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/60 focus:border-white/40 [&>option]:text-black";

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (state) p.set("state", state);
    if (category) p.set("category", category);
    router.push(`/business-directory${p.size ? `?${p}` : ""}`);
  }

  return (
    <form
      onSubmit={submit}
      className="liquid-glass mb-5 grid gap-2 rounded-xl p-2 sm:grid-cols-[1.4fr_1fr_1fr_auto]"
      role="search"
      aria-label="Find a business"
    >
      <input className={field} placeholder="Search company or service" value={q} onChange={(e) => setQ(e.target.value)} />
      <select className={field} value={state} onChange={(e) => setState(e.target.value)} aria-label="State">
        <option value="">All states</option>
        {Object.keys(STATES).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select className={field} value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-100">
        <Search size={16} /> Search
      </button>
    </form>
  );
}
