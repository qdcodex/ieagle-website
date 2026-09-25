import Link from "next/link";
import {
  ArrowRight, Eye, Target, Network, GraduationCap, Handshake, Crown, Trophy, BookOpen, MapPin, CalendarDays, HeartHandshake,
  UserPlus, Users, Flag, MessageCircle, Store, Sparkles,
} from "lucide-react";
import Hero from "@/components/hero/Hero";
import Reveal from "@/components/home/Reveal";
import Counter from "@/components/home/Counter";
import ScrollMarquee from "@/components/home/ScrollMarquee";
import ChapterMap from "@/components/ChapterMap";
import MembershipTiers from "@/components/MembershipTiers";
import WhyJoin from "@/components/WhyJoin";
import Testimonials from "@/components/Testimonials";
import { Section, Heading, Chips } from "@/components/blocks";
import { HOME, VISION, MISSION, ABOUT, BRAND, NETWORKING, ACADEMY, MEMBERSHIP, BENEFITS, WHY_JOIN, TESTIMONIALS, JOIN_US, CSR, PARTNERSHIPS, CHAPTERS_INFO, DIRECTORY_INFO } from "@/lib/content";
import { UPCOMING_EVENTS, CHAPTERS, INDUSTRIES, SITE, wa } from "@/lib/data";

const STATS = [
  { to: CHAPTERS.length, label: "Chapters" },
  { to: MEMBERSHIP.categories.length, label: "Membership categories" },
  { to: NETWORKING.platforms.length, label: "Networking platforms" },
  { to: ACADEMY.programs.length, label: "Academy programs" },
];

const PROGRAMS = [
  { icon: Network, t: "Networking", d: "Connect beyond business cards — chapter meetings, one-to-ones, conclaves and more.", href: "/programs#networking" },
  { icon: GraduationCap, t: "iEagles Academy", d: "Learn. Apply. Grow. Lead. Programs from entrepreneurship to AI & technology.", href: "/programs#academy" },
  { icon: Handshake, t: "Business Development", d: "From connection to collaboration — turn introductions into business opportunities.", href: "/programs#business-development" },
  { icon: Crown, t: "Learning & Leadership", d: "Learn from experienced business leaders, experts and fellow members.", href: "/programs#learning" },
  { icon: Trophy, t: "Recognition & Awards", d: "Celebrate excellence — entrepreneur of the month, leadership, community impact.", href: "/awards" },
  { icon: BookOpen, t: "Brand Your Business Magazine", d: "Increase your visibility and tell your story. Your business deserves to be seen.", href: "/magazine" },
];

const EYEBROW = "mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl shadow-2xl md:grid-cols-4" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center text-white">
              <div className="text-4xl font-semibold tracking-tight text-gold md:text-5xl">
                <Counter to={s.to} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/80 md:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Headline marquee */}
      <div className="mt-20">
        <ScrollMarquee />
      </div>

      {/* Welcome */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <p className={EYEBROW}>Welcome to {BRAND.name}</p>
          <h2 className="mb-5 !text-4xl md:!text-5xl" style={{ letterSpacing: "-0.03em" }}>{HOME.intro}</h2>
          <p className="mb-8 text-lg text-[#5b6675]">{HOME.belief}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about" className="inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-3 font-semibold text-white transition-all hover:gap-3">
              Explore iEagles <ArrowRight size={18} />
            </Link>
            <Link href="/membership#apply" className="inline-flex items-center gap-2 rounded-xl border-2 border-navy px-7 py-3 font-semibold text-navy transition hover:bg-navy hover:text-white">
              Become a Member
            </Link>
          </div>
        </Reveal>
        <Reveal delay={150} className="relative flex justify-center">
          <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#eef2ff] to-white p-10 shadow-xl ring-1 ring-black/5">
            <div className="dots absolute inset-0 rounded-3xl" />
            <img src="/logo.png" alt="iEagles" className="floaty relative w-full max-w-xs" />
            <p className="relative mt-4 text-center text-lg font-semibold text-navy">{BRAND.tagline}</p>
            <div className="absolute -left-3 top-8 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-navy shadow-lg sm:-left-6">🤝 Connect • Grow</div>
            <div className="absolute -bottom-4 -right-3 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy shadow-lg sm:-right-6">Serve • Transform</div>
          </div>
        </Reveal>
      </section>

      {/* Vision & Mission */}
      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl p-8 text-white md:p-10" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f7b800]/20 blur-2xl" />
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy"><Eye size={28} /></div>
              <h2 className="relative mb-4 !text-3xl !text-white">Our Vision</h2>
              <p className="relative text-lg leading-relaxed text-white/90">{VISION}</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-3xl border border-[#e2e7ef] bg-[#f6f8fb] p-8 md:p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy"><Target size={28} /></div>
              <h2 className="mb-5 !text-3xl">Our Mission</h2>
              <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2">
                {MISSION.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 rounded-xl bg-white px-3 py-2.5 font-medium text-[#1c2430] shadow-sm">
                    <ArrowRight size={18} className="mt-0.5 shrink-0 text-gold" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e2e7ef] bg-white px-6 py-5 shadow-sm sm:flex-row">
          <p className="text-lg font-semibold text-navy">{HOME.cta}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/membership#apply" className="rounded-xl bg-gold px-5 py-2.5 font-semibold text-navy">Become a Member</Link>
            <Link href="/about" className="rounded-xl bg-navy px-5 py-2.5 font-semibold text-white">Explore iEagles</Link>
          </div>
        </Reveal>
      </Section>

      {/* Different */}
      <Section tone="navy">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Heading light eyebrow="About iEagles" title={ABOUT.differentTitle} intro={ABOUT.different} className="!mb-6" />
            <Reveal>
              <Link href="/about#different" className="inline-flex items-center gap-2 font-semibold text-gold transition-all hover:gap-3">Our approach <ArrowRight size={18} /></Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">{ABOUT.approachIntro}</p>
            <Chips light items={ABOUT.approach} />
          </Reveal>
        </div>
      </Section>

      {/* Programs */}
      <Section tone="white">
        <Heading center eyebrow="What we offer" title="Programs that turn connections into growth" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map(({ icon: Icon, t, d, href }, i) => (
            <Reveal key={t} delay={i * 70}>
              <Link href={href} className="group block h-full rounded-3xl border border-[#e2e7ef] bg-[#f6f8fb] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-navy hover:shadow-2xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy transition group-hover:scale-110"><Icon size={24} /></div>
                <h3 className="mb-2 text-xl transition group-hover:!text-white">{t}</h3>
                <p className="text-[#5b6675] transition group-hover:text-white/80">{d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy transition group-hover:text-gold">Explore <ArrowRight size={16} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Membership */}
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Heading eyebrow="Membership" title={MEMBERSHIP.title} intro={MEMBERSHIP.intro} className="!mb-0" />
          <Reveal>
            <Link href="/membership" className="inline-flex items-center gap-2 font-semibold text-navy transition-all hover:gap-3">All membership details <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
        <MembershipTiers compact />
        <Reveal className="mt-10 rounded-3xl border border-[#e2e7ef] bg-white p-6 shadow-sm md:p-8">
          <p className={EYEBROW}>What Members Get</p>
          <p className="mb-5 text-xl font-semibold text-navy">{BENEFITS.title}</p>
          <Chips items={BENEFITS.items.map((b) => b.t)} />
        </Reveal>
      </Section>

      {/* Why join */}
      <Section tone="navy">
        <Heading center light eyebrow="Why Join iEagles?" title={WHY_JOIN.title} intro={WHY_JOIN.intro} />
        <WhyJoin light />
      </Section>

      {/* Chapters */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Heading eyebrow="Chapters" title={CHAPTERS_INFO.mapTitle} intro={CHAPTERS_INFO.body[1]} className="!mb-6" />
            <Reveal className="mb-8 flex flex-wrap gap-2">
              {CHAPTERS.map((c) => (
                <Link key={c.slug} href={`/chapters/${c.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e7ef] bg-[#f6f8fb] px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white">
                  <MapPin size={14} className="text-gold" /> {c.name}
                </Link>
              ))}
            </Reveal>
            <Reveal className="flex flex-wrap gap-3">
              <Link href="/chapters#map" className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 font-semibold text-white">Find a Chapter <ArrowRight size={18} /></Link>
              <Link href="/chapters#start" className="inline-flex items-center gap-2 rounded-xl border-2 border-navy px-6 py-3 font-semibold text-navy hover:bg-navy hover:text-white">Start a Chapter</Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="rounded-3xl p-4 shadow-2xl md:p-6" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 55%,#2c3fa8)" }}>
              <p className="px-2 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Kanyakumari District</p>
              <ChapterMap />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Events */}
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Events" title="Where Connections Come Alive" intro="Stay connected with upcoming iEagles programs and events." className="!mb-0" />
          <Reveal>
            <Link href="/events" className="inline-flex items-center gap-2 font-semibold text-navy transition-all hover:gap-3">View Upcoming Events <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {UPCOMING_EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 100}>
              <div className="flex h-full items-center gap-5 rounded-2xl border border-[#e2e7ef] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold"><CalendarDays size={28} /></span>
                <div>
                  <h3 className="mb-1 text-lg">{e.title}</h3>
                  <p className="text-sm text-[#5b6675]">{e.date} · {e.place}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Business directory */}
      <section className="bg-navy py-24 text-white" style={{ backgroundImage: "radial-gradient(circle at 20% 20%,#2c3fa8,transparent 50%)" }}>
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <p className={EYEBROW}>Business Directory</p>
            <h2 className="mb-4 !text-4xl !text-white md:!text-5xl" style={{ letterSpacing: "-0.03em" }}>{DIRECTORY_INFO.title}</h2>
            <p className="mx-auto mb-10 max-w-2xl text-white/80">{DIRECTORY_INFO.body}</p>
          </Reveal>
          <Reveal delay={100} className="mb-10 flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((c) => (
              <Link key={c} href={`/business-directory?category=${encodeURIComponent(c)}`} className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm backdrop-blur transition hover:bg-gold hover:text-navy">
                {c}
              </Link>
            ))}
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/business-directory" className="inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-3 font-semibold text-navy"><Store size={18} /> Open Business Directory</Link>
            <Link href="/business-directory#enroll" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3 font-semibold">{DIRECTORY_INFO.cta}</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Section tone="white">
        <Heading center eyebrow="Testimonials" title={TESTIMONIALS.title} />
        <Testimonials />
      </Section>

      {/* Purpose + partners */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Link href="/social-responsibility" className="group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 text-white shadow-xl md:p-10" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 55%,#2c3fa8)" }}>
              <HeartHandshake size={40} className="mb-5 text-gold" />
              <p className={EYEBROW}>Social Responsibility</p>
              <h3 className="!text-3xl !text-white">{CSR.title}</h3>
              <p className="mt-3 flex-1 text-white/80">{CSR.body[0]}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold transition-all group-hover:gap-3">Donate & learn more <ArrowRight size={18} /></span>
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/partnerships" className="group flex h-full flex-col rounded-3xl p-8 text-navy shadow-xl md:p-10" style={{ background: "linear-gradient(120deg,#f7b800,#ffd54a)" }}>
              <Handshake size={40} className="mb-5" />
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy/70">Partnerships</p>
              <h3 className="!text-3xl">{PARTNERSHIPS.title}</h3>
              <p className="mt-3 flex-1 text-navy/80">For {PARTNERSHIPS.types.slice(0, -1).join(", ").toLowerCase()} and {PARTNERSHIPS.types.at(-1)!.toLowerCase()}.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3">{PARTNERSHIPS.cta} <ArrowRight size={18} /></span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Join us */}
      <section className="px-6 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-16 text-center text-white shadow-2xl md:px-16" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 55%,#2c3fa8)" }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.4) 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }} />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#f7b800]/25 blur-3xl" />
            <div className="relative">
              <Sparkles className="mx-auto mb-4 text-gold" size={32} />
              <p className={EYEBROW}>Join Us</p>
              <h2 className="mx-auto max-w-3xl !text-4xl !text-white md:!text-5xl" style={{ letterSpacing: "-0.03em" }}>{JOIN_US.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{JOIN_US.body}</p>
              <p className="mt-6 text-xl font-semibold">{BRAND.name}</p>
              <p className="text-gold">{BRAND.pillars.join(" • ")}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/membership#apply" className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-semibold text-navy"><UserPlus size={18} /> Become a Member</Link>
                <Link href="/chapters#map" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-navy"><Users size={18} /> Join a Chapter</Link>
                <Link href="/chapters#start" className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold"><Flag size={18} /> Start a Chapter</Link>
                <a href={wa()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-6 py-3 font-semibold"><MessageCircle size={18} /> Contact Us</a>
              </div>
              <p className="mt-6 text-sm text-white/60">Helpline: {SITE.whatsappDisplay} · {SITE.email}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
