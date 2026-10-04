import {
  GraduationCap, Rocket, Briefcase, Megaphone, Wallet, Laptop, Cpu, Crown, MessageSquare, Sparkles, BookOpen, Video, Award,
  Target, BadgeCheck, LineChart, Network, Sprout,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, CtaBand } from "@/components/blocks";
import { ACADEMY, LEARNING } from "@/lib/content";
import { wa } from "@/lib/data";

export const metadata = { title: "iEagles Academy — iEagles Business Network" };

const ACADEMY_ICONS = [Rocket, Briefcase, Megaphone, Wallet, Laptop, Cpu, Crown, MessageSquare, Sparkles];
const FUTURE_ICONS = [BookOpen, Video, GraduationCap, Award];
const LEARN_ICONS = [Rocket, Crown, Target, Megaphone, Laptop, BadgeCheck, LineChart, MessageSquare, Cpu, Network, Sprout];

export default function Academy() {
  return (
    <>
      <PageHero
        eyebrow={ACADEMY.title}
        title={ACADEMY.subtitle}
        crumb="iEagles Academy"
        subtitle={ACADEMY.lead}
        links={[
          { label: "Academy Programs", href: "#academy" },
          { label: "Learning & Leadership", href: "#learning" },
        ]}
      />

      {/* Academy programs */}
      <Section id="academy" tone="navy">
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <Heading light eyebrow="What you will learn" title="Academy Programs" className="!mb-10" />
          <Reveal className="mb-10 flex md:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f7b800] px-5 py-2 font-semibold text-[#1a2a80]">
              <GraduationCap size={18} /> {ACADEMY.programs.length} learning programs
            </span>
          </Reveal>
        </div>
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

      {/* Learning & leadership */}
      <Section id="learning" tone="white">
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

      <Section>
        <CtaBand
          title="Ready to learn, lead and grow?"
          text="Join a chapter and take part in academy programs and leadership training."
          actions={[
            { label: "Become a Member", href: "/membership#apply" },
            { label: "Ask about the Academy", href: wa("I would like to know more about the iEagles Academy"), external: true, variant: "white" },
          ]}
        />
      </Section>
    </>
  );
}
