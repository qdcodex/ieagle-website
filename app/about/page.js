import {
  Eye, Target, Handshake, Rocket, Crown, Share2, Lightbulb, Puzzle, Megaphone, GraduationCap, Users, HeartHandshake,
  ShieldCheck, Award, Flame, Crosshair, Feather, Mountain, Landmark, Briefcase, MapPinned, UserCheck, User, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, IconCard, Flow, CtaBand } from "@/components/blocks";
import { ABOUT, VISION, MISSION, VALUES, OBJECTIVES, JOIN_US, BRAND } from "@/lib/content";

export const metadata = { title: "About us — iEagles Business Network" };

const APPROACH_ICONS = [Handshake, Rocket, Crown, Share2, Lightbulb, Puzzle, Megaphone, GraduationCap, Users, HeartHandshake];
const VALUE_ICONS = [ShieldCheck, Lightbulb, Award, Handshake, Crown, HeartHandshake];
const TRAIT_ICONS = [Eye, Flame, Crosshair, Feather, Crown, Mountain];

const LEVELS = [
  { icon: Landmark, t: "Governing Board", d: "Sets the direction, policies and standards of the network." },
  { icon: Briefcase, t: "Executive Members", d: "Lead network-wide initiatives, programs and growth." },
  { icon: MapPinned, t: "District", d: "Coordinates the chapters within each district." },
  { icon: UserCheck, t: "Chapter Director", d: "Leads a local chapter, its meetings and activities." },
  { icon: User, t: "Chapter Members", d: "Entrepreneurs and professionals who connect, collaborate, learn and grow." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About iEagles"
        title="Who We Are"
        crumb="About us"
        subtitle={`${BRAND.name} — ${BRAND.tagline}.`}
        links={[
          { label: "Who We Are", href: "#who" },
          { label: "Vision & Mission", href: "#vision" },
          { label: "Core Values", href: "#values" },
          { label: "Objectives", href: "#objectives" },
          { label: "Origin", href: "#origin" },
          { label: "Hierarchy", href: "#hierarchy" },
        ]}
      />

      {/* Who we are */}
      <Section id="who">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Heading eyebrow="About iEagles" title="A strong community for entrepreneurs, professionals and aspiring leaders." className="!mb-6" />
            <Reveal>
              <p className="mb-4 text-lg text-[#1c2430]">{ABOUT.whoWeAre}</p>
              <a href="#origin" className="inline-flex items-center gap-2 font-semibold text-[#1a2a80] transition-all hover:gap-3">Why the name iEagles? <ArrowRight size={16} /></a>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="relative rounded-3xl bg-gradient-to-br from-[#eef2ff] to-white p-8 shadow-xl ring-1 ring-black/5">
              <div className="dots absolute inset-0 rounded-3xl" />
              <img src="/logo.png" alt="iEagles" className="floaty relative mx-auto w-full max-w-[260px]" />
              <p className="relative mt-4 text-center text-lg font-semibold text-[#1a2a80]">{BRAND.tagline}</p>
              <p className="relative text-center text-[#f7b800]">{BRAND.pillars.join(" • ")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 rounded-3xl border border-[#e2e7ef] bg-white p-8 text-center shadow-sm md:p-10">
          <p className="mb-6 text-lg font-medium text-[#1a2a80]">{ABOUT.aimIntro}</p>
          <Flow steps={ABOUT.journey} />
        </Reveal>
      </Section>

      {/* What makes us different */}
      <Section id="different" tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Heading eyebrow="Our difference" title={ABOUT.differentTitle} light className="!mb-6" />
            <Reveal>
              {ABOUT.different.map((p, i) => (
                <p key={p} className={i === 0 ? "mb-3 text-xl text-white" : "text-lg text-white/80"}>
                  {i === 0 ? <strong>{p}</strong> : p}
                </p>
              ))}
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{ABOUT.approachIntro}</p>
            </Reveal>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ABOUT.approach.map((t, i) => {
              const Icon = APPROACH_ICONS[i];
              return (
                <Reveal key={t} delay={i * 50}>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 backdrop-blur transition hover:bg-white/15">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f7b800] text-[#1a2a80]">
                      <Icon size={20} />
                    </span>
                    <span className="font-medium">{t}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section id="vision" tone="white">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl p-8 text-white md:p-10" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f7b800]/20 blur-2xl" />
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7b800] text-[#1a2a80]"><Eye size={28} /></div>
              <h2 className="relative mb-4 !text-3xl !text-white">Our Vision</h2>
              <p className="relative text-lg leading-relaxed text-white/90">{VISION}</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <div id="mission" className="h-full scroll-mt-28 rounded-3xl bg-[#f7b800] p-8 text-[#1a2a80] md:p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a2a80] text-white"><Target size={28} /></div>
              <h2 className="mb-5 !text-3xl">Our Mission</h2>
              <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2">
                {MISSION.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 rounded-xl bg-white/50 px-3 py-2.5 font-medium">
                    <ArrowRight size={18} className="mt-0.5 shrink-0" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Core values */}
      <Section id="values">
        <Heading center eyebrow="Our Core Values" title={VALUES.title} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.items.map((v, i) => (
            <IconCard key={v.t} icon={VALUE_ICONS[i]} title={v.t} text={v.d} index={i + 1} delay={i * 70} />
          ))}
        </div>
      </Section>

      {/* Objectives */}
      <Section id="objectives" tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Heading eyebrow="Our Objectives" title={OBJECTIVES.title} intro={OBJECTIVES.intro} className="!mb-0" />
          </div>
          <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {OBJECTIVES.items.map((o, i) => (
              <Reveal key={o} delay={i * 40}>
                <li className="flex h-full items-start gap-4 rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-5 transition hover:border-[#f7b800] hover:bg-white hover:shadow-lg">
                  <span className="text-2xl font-semibold leading-none text-[#f7b800]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium text-[#1c2430]">{o}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Origin */}
      <Section id="origin" tone="navy">
        <Heading center light eyebrow="Origin" title="Why the name iEagles?" intro={ABOUT.nameMeaning} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT.eagleTraits.map((t, i) => {
            const Icon = TRAIT_ICONS[i];
            return (
              <Reveal key={t} delay={i * 70}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f7b800] text-[#1a2a80]"><Icon size={22} /></span>
                  <span className="text-lg font-semibold text-white">{t}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-14 text-center">
          <p className="text-2xl font-light tracking-wide text-white md:text-3xl">
            {BRAND.pillars.map((p, i) => (
              <span key={p}>
                {i > 0 && <span className="mx-3 text-[#f7b800]">•</span>}
                {p}
              </span>
            ))}
          </p>
        </Reveal>
      </Section>

      {/* Hierarchy */}
      <Section id="hierarchy" tone="white">
        <Heading center eyebrow="How we are organised" title="Hierarchy" intro="A chapter-based network, connected from the local chapter to the governing board." />
        <div className="mx-auto flex max-w-2xl flex-col items-stretch">
          {LEVELS.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 90}>
              <div
                className="flex items-center gap-4 rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-5 shadow-sm transition hover:border-[#f7b800] hover:bg-white hover:shadow-lg"
                style={{ marginLeft: i * 14, marginRight: i * 14 }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a2a80] text-[#f7b800]"><Icon size={24} /></div>
                <div>
                  <h3 className="text-lg">{t}</h3>
                  <p className="text-sm text-[#5b6675]">{d}</p>
                </div>
              </div>
              {i < LEVELS.length - 1 && <div className="mx-auto h-6 w-0.5 bg-[#f7b800]" />}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Purpose & partnerships */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { href: "/social-responsibility", icon: HeartHandshake, e: "Social Responsibility", t: "Business With Purpose", d: "Community initiatives and the iEagles Rehabilitation Foundation." },
            { href: "/partnerships", icon: Handshake, e: "Partnerships", t: "Partner With iEagles", d: "For corporates, institutions, startups, associations, media and sponsors." },
          ].map((c, i) => (
            <Reveal key={c.href} delay={i * 100}>
              <Link href={c.href} className="group flex h-full items-start gap-5 rounded-3xl border border-[#e2e7ef] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1a2a80] text-[#f7b800]"><c.icon size={26} /></span>
                <span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{c.e}</span>
                  <span className="mt-1 block text-2xl font-semibold text-[#1a2a80]">{c.t}</span>
                  <span className="mt-1 block text-[#5b6675]">{c.d}</span>
                  <span className="mt-4 inline-flex items-center gap-1 font-semibold text-[#1a2a80] transition-all group-hover:gap-2">Learn more <ArrowRight size={16} /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <CtaBand title={JOIN_US.title} text={JOIN_US.body} actions={[{ label: "Become a Member", href: "/membership#apply" }, { label: "Join a Chapter", href: "/chapters", variant: "white" }]} />
      </Section>
    </>
  );
}
