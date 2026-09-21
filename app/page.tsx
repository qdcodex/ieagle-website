import Link from "next/link";
import { Handshake, CalendarDays, MapPinned, Store, Newspaper, Megaphone, ArrowRight, MessageCircle, UserPlus, Search, TrendingUp } from "lucide-react";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/home/Reveal";
import Counter from "@/components/home/Counter";
import { UPCOMING_EVENTS, CATEGORIES, SITE } from "@/lib/data";

const STATS = [
  { to: 25, suffix: "+", label: "States" },
  { to: 200, suffix: "+", label: "Districts" },
  { to: 1000, suffix: "+", label: "Members" },
  { to: 500, suffix: "+", label: "Events" },
];

const FEATURES = [
  { icon: Handshake, title: "Network & Collaborate", text: "Meet business owners from every state and district and build partnerships that last.", href: "/about" },
  { icon: CalendarDays, title: "Events & Meetups", text: "Summits, fairs and chapter meets — grow your circle in person.", href: "/events" },
  { icon: MapPinned, title: "State & District Directory", text: "Find chapters and leaders near you, organised by state and district.", href: "/directory" },
  { icon: Store, title: "Business Directory", text: "List your company and be discovered by category, area and location.", href: "/business-directory" },
  { icon: Newspaper, title: "Bi-monthly Newsletter", text: "Member stories, opportunities and chapter news delivered every two months.", href: "/newsletter" },
  { icon: Megaphone, title: "Advertise & Sponsor", text: "Promote your brand offline and online, or sponsor an upcoming event.", href: "/contact" },
];

const STEPS = [
  { icon: UserPlus, title: "Join your chapter", text: "Connect with the chapter in your district and become a member." },
  { icon: Search, title: "Get listed & discovered", text: "Add your business to the directory so members can find you." },
  { icon: TrendingUp, title: "Grow together", text: "Attend events, exchange referrals and expand your reach." },
];

const H2 = "!text-4xl md:!text-5xl";
const TIGHT = { letterSpacing: "-0.03em" };
const EYEBROW = "mb-3 text-sm font-semibold uppercase tracking-widest text-gold";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-6">
        <div
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl shadow-2xl md:grid-cols-4"
          style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center text-white">
              <div className="text-4xl font-semibold tracking-tight text-gold md:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm uppercase tracking-widest text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <p className={EYEBROW}>Who we are</p>
          <h2 className={`mb-5 ${H2}`} style={TIGHT}>
            A network built on trust, service and growth.
          </h2>
          <p className="mb-4 text-lg text-[#5b6675]">
            iEagle brings business owners, professionals and entrepreneurs together across states and districts — so every member has a community to lean on and opportunities to grow.
          </p>
          <ul className="mb-8 space-y-2 text-[#1c2430]">
            {["Chapters in every state and district", "Verified member business directory", "Regular events, newsletters and sponsorship options"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
          <Link href="/about" className="inline-flex items-center gap-2 rounded-lg bg-navy px-7 py-3 font-medium text-white transition-all hover:gap-3">
            Learn more <ArrowRight size={18} />
          </Link>
        </Reveal>
        <Reveal delay={150} className="relative flex justify-center">
          <div className="relative flex w-full max-w-md items-center justify-center rounded-3xl bg-gradient-to-br from-[#eef2ff] to-white p-10 shadow-xl ring-1 ring-black/5">
            <div className="dots absolute inset-0 rounded-3xl" />
            <img src="/logo.png" alt="iEagle" className="floaty relative w-full max-w-xs" />
            <div className="absolute -left-4 top-8 rounded-xl bg-white px-4 py-2 text-sm font-medium shadow-lg">🤝 Trusted network</div>
            <div className="absolute -right-4 bottom-10 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy shadow-lg">Growing every day</div>
          </div>
        </Reveal>
      </section>

      {/* What we offer */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className={EYEBROW}>What we offer</p>
            <h2 className={H2} style={TIGHT}>Everything your business needs to connect</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text, href }, i) => (
              <Reveal key={title} delay={i * 80}>
                <Link
                  href={href}
                  className="group block h-full rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-navy hover:shadow-2xl"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-2 text-xl transition group-hover:text-white">{title}</h3>
                  <p className="text-[#5b6675] transition group-hover:text-white/80">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:text-gold">
                    Explore <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={EYEBROW}>Mark your calendar</p>
            <h2 className={H2} style={TIGHT}>Upcoming events</h2>
          </div>
          <Link href="/events" className="inline-flex items-center gap-2 font-semibold text-navy">
            All events <ArrowRight size={18} />
          </Link>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {UPCOMING_EVENTS.map((e, i) => {
            const [month, year] = e.date.split(" ");
            return (
              <Reveal key={e.title} delay={i * 100}>
                <div className="flex h-full gap-5 rounded-2xl border border-[#e2e7ef] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-white">
                    <span className="text-xs uppercase tracking-widest text-gold">{year}</span>
                    <span className="text-2xl font-semibold">{month}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl">{e.title}</h3>
                    <p className="text-sm text-[#5b6675]">📍 {e.place}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Business categories */}
      <section className="bg-navy py-24 text-white" style={{ backgroundImage: "radial-gradient(circle at 20% 20%,#2c3fa8,transparent 50%)" }}>
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <p className={EYEBROW}>Business Directory</p>
            <h2 className={`mb-4 ${H2} !text-white`} style={TIGHT}>Find the right business, fast</h2>
            <p className="mx-auto mb-10 max-w-xl text-white/80">Browse member companies by state, district, area or category.</p>
          </Reveal>
          <Reveal delay={100} className="mb-10 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((c) => (
              <Link key={c} href="/business-directory" className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm backdrop-blur transition hover:bg-gold hover:text-navy">
                {c}
              </Link>
            ))}
          </Reveal>
          <Link href="/business-directory" className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 font-semibold text-navy">
            Open Business Directory <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className={EYEBROW}>How it works</p>
          <h2 className={H2} style={TIGHT}>Three simple steps</h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120} className="text-center">
              <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-navy shadow-lg ring-4 ring-gold/40">
                <Icon size={32} />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">{i + 1}</span>
              </div>
              <h3 className="mb-2 text-xl">{title}</h3>
              <p className="text-[#5b6675]">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <Reveal>
          <div
            className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl px-8 py-14 text-center text-navy md:flex-row md:justify-between md:text-left"
            style={{ background: "linear-gradient(120deg,#f7b800,#ffd54a)" }}
          >
            <div>
              <h2 className="mb-2 !text-3xl md:!text-4xl">Ready to grow your network?</h2>
              <p className="text-navy/80">Talk to our team on WhatsApp — {SITE.whatsappDisplay}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-navy px-7 py-3 font-medium text-white">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <Link href="/member-login" className="rounded-lg bg-white px-7 py-3 font-medium text-navy">
                Member Log in
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
