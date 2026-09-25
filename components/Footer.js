import Link from "next/link";
import { ArrowRight, ArrowUp, MessageCircle, Phone, Mail, MapPin, Globe } from "lucide-react";
import { NAV, SITE } from "@/lib/data";
import { HOME } from "@/lib/content";
import { SocialLinks } from "@/components/SocialFloat";

const byLabel = (label) => NAV.find((n) => n.label === label);
const COLUMNS = [
  { title: "About us", links: byLabel("About us").children.slice(0, 7) },
  { title: "Programs", links: byLabel("Programs").children },
  {
    title: "Network",
    links: [
      { label: "Membership", href: "/membership" },
      { label: "Member Log in", href: "/member-login" },
      { label: "Chapters", href: "/chapters" },
      { label: "Events", href: "/events" },
      { label: "Magazine", href: "/magazine" },
      { label: "Business Directory", href: "/business-directory" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Social Responsibility", href: "/social-responsibility" },
    ],
  },
];

const linkCls = "inline-block text-white/70 transition hover:translate-x-1 hover:text-[#f7b800]";
const headCls = "mb-4 text-sm font-semibold uppercase tracking-widest text-[#f7b800]";

export default function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-[#0f1a55] text-white" style={{ backgroundImage: "radial-gradient(circle at 85% 0%,#2c3fa8 0,transparent 45%)" }}>
      <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#f7b800,#ffd54a,#f7b800)" }} />

      {/* CTA strip */}
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/15 bg-white/5 px-8 py-8 backdrop-blur md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="!text-white text-2xl md:text-3xl" style={{ letterSpacing: "-0.02em" }}>{HOME.cta}</h3>
            <p className="mt-1 text-white/70">{SITE.pillars}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/membership#apply" className="inline-flex items-center gap-2 rounded-lg bg-[#f7b800] px-6 py-3 font-semibold text-[#1a2a80]">
              Become a Member <ArrowRight size={18} />
            </Link>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-6 py-3 font-semibold text-white">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <img src="/logo.png" alt="iEagles" className="mb-4 h-28 w-auto md:h-32" />
          <p className="text-lg font-semibold">{SITE.fullName}</p>
          <p className="mb-5 text-white/70">{SITE.tagline}</p>
          <ul className="m-0 mb-6 list-none space-y-2.5 p-0 text-sm text-white/80">
            <li className="flex items-start gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-[#f7b800]" /> {SITE.address}</li>
            <li><a href={`tel:+${SITE.whatsapp}`} className="flex items-center gap-2.5 hover:text-[#f7b800]"><Phone size={16} className="shrink-0 text-[#f7b800]" /> Helpline: {SITE.whatsappDisplay}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 break-all hover:text-[#f7b800]"><Mail size={16} className="shrink-0 text-[#f7b800]" /> {SITE.email}</a></li>
            <li><a href={`https://${SITE.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#f7b800]"><Globe size={16} className="shrink-0 text-[#f7b800]" /> {SITE.website}</a></li>
          </ul>
          <SocialLinks dark />
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className={headCls}>{col.title}</h4>
            <ul className="m-0 list-none space-y-2.5 p-0">
              {col.links.map((c) => (
                <li key={c.href + c.label}>
                  <Link href={c.href} className={linkCls}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-sm text-white/60">
          <span>© {new Date().getFullYear()} {SITE.fullName}. All rights reserved.</span>
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
