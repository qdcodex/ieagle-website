import {
  Users, UsersRound, UserRound, Presentation, Share2, Factory, Building2, PartyPopper, Coffee, Handshake, Landmark, Crown, GraduationCap,
  CalendarCheck, Trophy, HeartHandshake, Mic, MessagesSquare, ArrowDown, Target,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, Flow, CtaBand } from "@/components/blocks";
import { NETWORKING, BUSINESS_DEV } from "@/lib/content";
import { wa } from "@/lib/data";

export const metadata = { title: "Programs — iEagles Business Network" };

const PLATFORM_ICONS = [Users, UsersRound, UserRound, Presentation, Share2, Factory, Building2, PartyPopper, Coffee, Handshake, Landmark, Crown, GraduationCap, CalendarCheck, Trophy, HeartHandshake, Mic];
const DEV_ICONS = [Handshake, MessagesSquare, Users, Share2, Target];

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Network. Collaborate. Grow."
        crumb="Programs"
        subtitle="Structured networking and business development that turn connections into growth."
        links={[
          { label: "Networking", href: "#networking" },
          { label: "Business Development", href: "#business-development" },
          { label: "Upcoming Events", href: "/events#upcoming" },
          { label: "Past Events", href: "/events#past" },
          { label: "Recognition & Awards", href: "/awards" },
          { label: "iEagles Academy", href: "/academy" },
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

      <Section className="!pt-0">
        <CtaBand
          title="Ready to grow your network?"
          text="Join a chapter and take part in networking meetings, events and business development."
          actions={[
            { label: "Become a Member", href: "/membership#apply" },
            { label: "Ask about programs", href: wa("I would like to know more about iEagles programs"), external: true, variant: "white" },
          ]}
        />
      </Section>
    </>
  );
}
