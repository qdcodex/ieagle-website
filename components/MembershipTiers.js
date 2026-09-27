import Link from "next/link";
import { Star, Medal, Gem, Diamond, Crown, Handshake, ArrowRight } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { MEMBERSHIP } from "@/lib/content";

// Visual style for each category, in document order.
const STYLE = {
  Elite: { icon: Star, bg: "linear-gradient(145deg,#1a2a80,#2c3fa8)", fg: "#fff", accent: "#f7b800" },
  Gold: { icon: Medal, bg: "linear-gradient(145deg,#f7b800,#ffe07a)", fg: "#1a2a80", accent: "#1a2a80" },
  Platinum: { icon: Gem, bg: "linear-gradient(145deg,#8e9aaf,#e5e9f0)", fg: "#1a2a80", accent: "#1a2a80" },
  Diamond: { icon: Diamond, bg: "linear-gradient(145deg,#0a5f93,#23a6d9)", fg: "#fff", accent: "#fff" },
  Millionaire: { icon: Crown, bg: "linear-gradient(145deg,#0b1024,#2a2f45)", fg: "#fff", accent: "#f7b800" },
  Partner: { icon: Handshake, bg: "linear-gradient(145deg,#0f5132,#1f9d68)", fg: "#fff", accent: "#ffd54a" },
};

export default function MembershipTiers({ compact = false }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${compact ? "lg:grid-cols-6" : "lg:grid-cols-3"}`}>
      {MEMBERSHIP.categories.map((c, i) => {
        const s = STYLE[c.t];
        const Icon = s.icon;
        return (
          <Reveal key={c.t} delay={i * 80}>
            <div
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${compact ? "p-5" : "p-8"}`}
              style={{ background: s.bg, color: s.fg }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl transition group-hover:scale-150" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <Icon size={compact ? 26 : 34} style={{ color: s.accent }} className="relative mb-4" />
              <p className="relative text-xs font-bold uppercase tracking-[0.2em] opacity-70">Membership</p>
              <h3 className={`relative font-semibold ${compact ? "text-xl" : "text-3xl"}`} style={{ color: s.fg }}>
                {c.t}
              </h3>
              <p className={`relative mt-2 flex-1 ${compact ? "text-sm" : "text-lg"} opacity-90`}>{c.d}</p>
              {!compact && (
                <Link
                  href={`/membership?category=${encodeURIComponent(c.t)}#apply`}
                  className="relative mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:gap-3 hover:bg-white/30"
                  style={{ color: s.fg }}
                >
                  Enquire <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
