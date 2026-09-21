import { Eye, Target, Flag, Sparkles, Rocket, Quote, ShieldCheck, Users, Lightbulb, HeartHandshake, Landmark, MapPinned, Building, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, SectionTitle, cardCls } from "@/components/ui";

export const metadata = { title: "About us — iEagle" };

const VALUES = [
  { icon: ShieldCheck, t: "Trust", d: "Every member is part of a network built on integrity." },
  { icon: HeartHandshake, t: "Service", d: "We give back to the communities we grow in." },
  { icon: Users, t: "Fellowship", d: "Lasting relationships beyond business." },
  { icon: Lightbulb, t: "Growth", d: "Ideas, referrals and opportunities shared freely." },
];

// Placeholder milestones — replace with the real story.
const TIMELINE = [
  { year: "Year 1", icon: Sparkles, t: "The idea", d: "A small group of business owners decide to build a network built on trust and shared growth." },
  { year: "Year 2", icon: Flag, t: "First chapter", d: "The first chapter is formed, the first members join and the first events are held." },
  { year: "Year 3", icon: MapPinned, t: "State expansion", d: "Chapters spread across districts and states, connecting more businesses every month." },
  { year: "Today", icon: Rocket, t: "A growing network", d: "Members, events and a directory that brings businesses together everywhere." },
];

const LEVELS = [
  { icon: Landmark, t: "National / Governing Board", d: "Sets direction, policy and standards." },
  { icon: MapPinned, t: "State Council", d: "Coordinates districts within each state." },
  { icon: Building, t: "District Cabinet", d: "Leads chapters and district events." },
  { icon: User, t: "Chapter Members", d: "Business owners who make the network work." },
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Who we are" subtitle="A network of business owners built on trust, service and growth." />

      <Section id="vision">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-navy"><Eye size={28} /></div>
              <h2 className="mb-3 !text-3xl !text-white">Our Vision</h2>
              <p className="text-white/85">Add your organisation&apos;s vision statement here — the future you want your network to create.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div id="mission" className="h-full scroll-mt-24 rounded-2xl bg-gold p-8 text-navy">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-white"><Target size={28} /></div>
              <h2 className="mb-3 !text-3xl">Our Mission</h2>
              <p className="text-navy/85">Add your mission statement here — what you do every day to move toward the vision.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <SectionTitle center eyebrow="What we stand for" title="Our core values" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 80}>
              <div className={`${cardCls} h-full text-center`}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold"><Icon size={26} /></div>
                <h3 className="mb-1 text-xl">{t}</h3>
                <p className="text-[#5b6675]">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section id="origin" className="relative scroll-mt-24 overflow-hidden py-24 text-white" style={{ background: "linear-gradient(160deg,#0f1a55 0%,#1a2a80 55%,#2c3fa8 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.4) 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }} />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#f7b800]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Our story</p>
            <h2 className="mb-4 !text-4xl !text-white md:!text-5xl" style={{ letterSpacing: "-0.03em" }}>How it all began</h2>
            <p className="text-lg text-white/80">
              Every great network starts with a simple idea. Ours began with business owners who believed that
              trust, service and fellowship could help everyone grow.
            </p>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-gradient-to-b from-gold via-white/40 to-transparent md:left-1/2 md:-translate-x-1/2" />
            {TIMELINE.map((m, i) => {
              const Icon = m.icon;
              const left = i % 2 === 0;
              return (
                <Reveal key={m.t} delay={i * 100} className="relative mb-12 last:mb-0">
                  <div className={`flex items-start pl-14 md:pl-0 ${left ? "md:justify-start" : "md:justify-end"}`}>
                    <div className={`w-full md:w-[calc(50%-3rem)] ${left ? "md:text-right" : ""}`}>
                      <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                        <span className="mb-2 inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-navy">{m.year}</span>
                        <h3 className="mb-1 !text-2xl !text-white">{m.t}</h3>
                        <p className="text-white/75">{m.d}</p>
                      </div>
                    </div>
                  </div>
                  <span className="absolute left-0 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy shadow-lg ring-4 ring-[#1a2a80] md:left-1/2 md:-translate-x-1/2">
                    <Icon size={20} />
                  </span>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={150} className="mx-auto mt-20 max-w-3xl">
            <figure className="relative rounded-2xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur md:p-10">
              <Quote size={40} className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gold p-2 text-navy" />
              <blockquote className="text-xl italic text-white md:text-2xl">
                “Add a short quote from a founder or leader about why the network was started.”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold uppercase tracking-widest text-gold">— Founder name, Title</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <Section id="hierarchy" alt>
        <SectionTitle center eyebrow="How we are organised" title="Hierarchy" />
        <div className="mx-auto flex max-w-2xl flex-col items-stretch">
          {LEVELS.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="flex items-center gap-4 rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-5 shadow-sm" style={{ marginLeft: i * 18, marginRight: i * 18 }}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold"><Icon size={24} /></div>
                <div>
                  <h3 className="text-lg">{t}</h3>
                  <p className="text-sm text-[#5b6675]">{d}</p>
                </div>
              </div>
              {i < LEVELS.length - 1 && <div className="mx-auto h-6 w-0.5 bg-gold" />}
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
