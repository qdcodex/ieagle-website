import Link from "next/link";
import { ArrowRight, ArrowUp, MessageCircle, Phone } from "lucide-react";
import { NAV, SITE } from "@/lib/data";
import { ICONS } from "@/components/SocialFloat";

const byLabel = (label) => NAV.find((n) => n.label === label);
const COLUMNS = ["About us", "Events", "Directory", "Newsletter"].map(byLabel);

const linkCls = "text-white/70 transition hover:translate-x-1 hover:text-[#f7b800] inline-block";
const headCls = "mb-4 text-sm font-semibold uppercase tracking-widest text-[#f7b800]";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f1a55] text-white" style={{ backgroundImage: "radial-gradient(circle at 85% 0%,#2c3fa8 0,transparent 45%)" }}>
      <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#f7b800,#ffd54a,#f7b800)" }} />

      {/* CTA strip */}
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/15 bg-white/5 px-8 py-8 backdrop-blur md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="!text-white text-2xl md:text-3xl" style={{ letterSpacing: "-0.02em" }}>Let&apos;s grow your business together</h3>
            <p className="mt-1 text-white/70">Join the network, list your company and meet members near you.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/member-login" className="inline-flex items-center gap-2 rounded-lg bg-[#f7b800] px-6 py-3 font-semibold text-[#1a2a80]">
              Join the Network <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-6 py-3 font-semibold text-white"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <img src="/logo.png" alt="iEagle" className="mb-4 h-20 w-auto" />
          <p className="mb-5 max-w-xs text-white/70">{SITE.tagline} A business network connecting members across states and districts.</p>
          <div className="flex gap-2.5">
            {Object.entries(ICONS).map(([name, { color, path }]) => (
              <a
                key={name}
                href={SITE.social[name]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-[var(--c)]"
                style={{ "--c": color }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" aria-hidden="true">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.label}>
            <h4 className={headCls}>{col.label}</h4>
            <ul className="list-none space-y-2.5 p-0">
              {col.children.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className={linkCls}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact + quick links row */}
      <div className="mx-auto max-w-6xl border-t border-white/10 px-6 py-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[["Home", "/"], ["Member Log in", "/member-login"], ["Business Directory", "/business-directory"], ["Contact us", "/contact"]].map(([l, h]) => (
              <Link key={h} href={h} className="text-white/80 hover:text-[#f7b800]">{l}</Link>
            ))}
          </div>
          <a href={`https://wa.me/${SITE.whatsapp}`} className="inline-flex items-center gap-2 text-white/90 hover:text-[#f7b800]">
            <Phone size={16} /> WA: {SITE.whatsappDisplay}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-sm text-white/60">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span className="inline-flex items-center gap-2">
            Digital Partner:
            <a href={SITE.partner.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-semibold text-[#f7b800] transition hover:bg-[#f7b800] hover:text-[#1a2a80]">
              {SITE.partner.name}
            </a>
          </span>
          <a href="#top" className="inline-flex items-center gap-1 hover:text-[#f7b800]">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
