import {
  Users, UsersRound, UserRound, Presentation, Share2, Factory, Building2, PartyPopper, Coffee, Handshake, Landmark, Crown, GraduationCap,
  CalendarCheck, Trophy, HeartHandshake, Mic, Rocket, Briefcase, Megaphone, Wallet, Laptop, Cpu, MessageSquare, Sparkles, BookOpen,
  Video, Award, MessagesSquare, ArrowDown, Target, BadgeCheck, LineChart, Network, Sprout,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, Flow, CtaBand } from "@/components/blocks";
import { NETWORKING, ACADEMY, BUSINESS_DEV, LEARNING } from "@/lib/content";
import { wa } from "@/lib/data";

export const metadata = { title: "Programs — iEagles Business Network" };

const PLATFORM_ICONS = [Users, UsersRound, UserRound, Presentation, Share2, Factory, Building2, PartyPopper, Coffee, Handshake, Landmark, Crown, GraduationCap, CalendarCheck, Trophy, HeartHandshake, Mic];
const ACADEMY_ICONS = [Rocket, Briefcase, Megaphone, Wallet, Laptop, Cpu, Crown, MessageSquare, Sparkles];
const FUTURE_ICONS = [BookOpen, Video, GraduationCap, Award];
const DEV_ICONS = [Handshake, MessagesSquare, Users, Share2, Target];
const LEARN_ICONS = [Rocket, Crown, Target, Megaphone, Laptop, BadgeCheck, LineChart, MessageSquare, Cpu, Network, Sprout];

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Network. Learn. Develop. Lead."
        crumb="Programs"
        subtitle="Structured platforms that turn connections into growth — for entrepreneurs, professionals and emerging leaders."
        links={[
          { label: "Networking", href: "#networking" },
          { label: "iEagles Academy", href: "#academy" },
          { label: "Business Development", href: "#business-development" },
          { label: "Learning & Leadership", href: "#learning" },
        ]}
      />

      {/* 6. Networking */}
      <Section id="networking">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Heading eyebrow="Networking" title={NETWORKING.title} className="!mb-6" />
            <Reveal>
              <p className="mb-4 text-xl font-semibold text-[#1a2a80]">{NETWORKING.lead}</p>
              <p className="text-lg text-[#5b6675]">{NETWORKING.body}</p>
              <div className="mt-8 rounded-2xl border-l-4 border-[#f7b800] bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold text-[#1a2a80]">{NETWORKING.closing}</p>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h3 className="mb-5 text-xl">{NETWORKING.platformsTitle}</h3>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {NETWORKING.platforms.map((p, i) => {
                const Icon = PLATFORM_ICONS[i];
                return (
                  <Reveal key={p} delay={Math.min(i * 35, 500)}>
                    <div className="group flex items-center gap-3 rounded-xl border border-[#e2e7ef] bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1a2a80] hover:shadow-lg">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a2a80] text-[#f7b800] transition group-hover:bg-[#f7b800] group-hover:text-[#1a2a80]">
                        <Icon size={19} />
                      </span>
                      <span className="font-medium text-[#1c2430]">{p}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Academy */}
      <Section id="academy" tone="navy">
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <Heading light eyebrow={ACADEMY.title} title={ACADEMY.subtitle} intro={ACADEMY.lead} className="!mb-10" />
          <Reveal className="mb-10 flex md:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f7b800] px-5 py-2 font-semibold text-[#1a2a80]">
              <GraduationCap size={18} /> {ACADEMY.programs.length} learning programs
            </span>
          </Reveal>
        </div>
        <h3 className="mb-5 !text-white text-xl">Programs:</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACADEMY.programs.map((p, i) => {
            const Icon = ACADEMY_ICONS[i];
            return (
              <Reveal key={p} delay={i * 50}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f7b800] text-[#1a2a80]"><Icon size={22} /></span>
                  <span className="text-lg font-semibold">{p}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 rounded-2xl border border-dashed border-white/30 p-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">Possible future features</p>
          <div className="flex flex-wrap gap-3">
            {ACADEMY.future.map((f, i) => {
              const Icon = FUTURE_ICONS[i];
              return (
                <span key={f} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium ring-1 ring-white/20">
                  <Icon size={16} className="text-[#f7b800]" /> {f}
                  <span className="rounded-full bg-[#f7b800]/20 px-2 text-[10px] font-bold uppercase tracking-wider text-[#f7b800]">Soon</span>
                </span>
              );
            })}
          </div>
        </Reveal>
      </Section>

      {/* 8. Business development */}
      <Section id="business-development" tone="white">
        <Heading center eyebrow="Business Development" title={BUSINESS_DEV.title} intro={BUSINESS_DEV.body} />
        <Reveal>
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#5b6675]">{BUSINESS_DEV.flowIntro}</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-5">
          {BUSINESS_DEV.flow.map((s, i) => {
            const Icon = DEV_ICONS[i];
            const last = i === BUSINESS_DEV.flow.length - 1;
            return (
              <Reveal key={s} delay={i * 110} className="relative">
                <div className={`flex h-full flex-col items-center rounded-2xl p-6 text-center shadow-sm ${last ? "bg-[#f7b800] text-[#1a2a80]" : "border border-[#e2e7ef] bg-[#f6f8fb]"}`}>
                  <span className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${last ? "bg-[#1a2a80] text-[#f7b800]" : "bg-[#1a2a80] text-white"}`}>
                    <Icon size={24} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f7b800]" style={last ? { color: "#1a2a80" } : undefined}>Step {i + 1}</span>
                  <span className="mt-1 text-lg font-semibold text-[#1a2a80]">{s}</span>
                </div>
                {!last && <ArrowDown className="mx-auto my-1 text-[#f7b800] md:hidden" size={22} />}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 9. Learning & leadership */}
      <Section id="learning">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Heading eyebrow="Learning & Leadership" title={LEARNING.title} intro={LEARNING.body} className="!mb-8" />
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl p-8 text-white" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
                <GraduationCap size={40} className="mb-4 text-[#f7b800]" />
                <p className="text-lg">Learn from experienced business leaders, experts and fellow members.</p>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h3 className="mb-5 text-xl">{LEARNING.programsTitle}</h3>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {LEARNING.programs.map((p, i) => {
                const Icon = LEARN_ICONS[i];
                return (
                  <Reveal key={p} delay={i * 40}>
                    <div className="flex items-center gap-3 rounded-xl border border-[#e2e7ef] bg-white px-4 py-3.5 shadow-sm transition hover:border-[#f7b800] hover:shadow-lg">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f7b800]/20 text-[#1a2a80]"><Icon size={19} /></span>
                      <span className="font-medium">{p}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <CtaBand
          title="Ready to learn, lead and grow?"
          text="Join a chapter and take part in networking meetings, academy programs and leadership training."
          actions={[
            { label: "Become a Member", href: "/membership#apply" },
            { label: "Ask about programs", href: wa("I would like to know more about iEagles programs"), external: true, variant: "white" },
          ]}
        />
      </Section>
    </>
  );
}
