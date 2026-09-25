import { Trophy, Briefcase, Sprout, Crown, HeartHandshake, Users, Network, Sparkles, Medal, BadgeCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, CtaBand } from "@/components/blocks";
import { AWARDS } from "@/lib/content";
import { wa } from "@/lib/data";

export const metadata = { title: "Recognition & Awards — iEagles Business Network" };

const ICONS = [Trophy, Briefcase, Sprout, Crown, HeartHandshake, Users, Network, Sparkles];

export default function Awards() {
  return (
    <>
      <PageHero eyebrow="Recognition & Awards" title={AWARDS.title} crumb="Recognition & Awards" subtitle="Honouring members, chapters and leaders who raise the bar for business and community." />

      {/* Premium categories */}
      <Section tone="navy">
        <Heading center light eyebrow="Award categories" title="Recognising excellence across the network" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.categories.map((c, i) => {
            const Icon = ICONS[i];
            const more = i === AWARDS.categories.length - 1;
            return (
              <Reveal key={c} delay={i * 70}>
                <div
                  className={`group relative flex h-full flex-col items-center overflow-hidden rounded-3xl p-7 text-center transition duration-300 hover:-translate-y-1.5 ${
                    more ? "border border-dashed border-white/30" : "border border-[#f7b800]/40 bg-gradient-to-b from-white/15 to-white/5 shadow-2xl"
                  }`}
                >
                  {!more && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#f7b800] to-transparent" />}
                  <span className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${more ? "bg-white/10 text-[#f7b800]" : "bg-gradient-to-br from-[#ffd54a] to-[#f7b800] text-[#1a2a80] shadow-[0_0_30px_rgba(247,184,0,.45)]"}`}>
                    <Icon size={28} />
                  </span>
                  <h3 className="!text-white text-lg">{c}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Verified awardees */}
      <Section tone="white">
        <Heading center eyebrow="Hall of fame" title="Awardees & achievements" intro="Verified awardees and achievements from across the iEagles network." />
        {AWARDS.awardees.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AWARDS.awardees.map((a) => (
              <Reveal key={`${a.name}-${a.award}`}>
                <div className="rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-6 text-center shadow-sm">
                  <Medal className="mx-auto mb-3 text-[#f7b800]" size={36} />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#f7b800]">{a.award}</p>
                  <h3 className="mt-1 text-xl">{a.name}</h3>
                  <p className="text-[#5b6675]">{[a.business, a.chapter, a.year].filter(Boolean).join(" · ")}</p>
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#1a2a80]/10 px-3 py-1 text-xs font-semibold text-[#1a2a80]">
                    <BadgeCheck size={14} /> Verified
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-[#e2e7ef] bg-[#f6f8fb] px-8 py-14 text-center">
              <Medal className="mx-auto mb-4 text-[#f7b800]" size={44} />
              <h3 className="text-2xl">The first awardees will be announced soon</h3>
              <p className="mt-2 text-[#5b6675]">Winners are published here once they are verified.</p>
            </div>
          </Reveal>
        )}
      </Section>

      <Section className="!pt-0">
        <CtaBand
          title="Know someone who deserves recognition?"
          text="Nominate a member, business or chapter for an iEagles award."
          actions={[{ label: "Nominate on WhatsApp", href: wa("I would like to nominate someone for an iEagles award"), external: true }]}
        />
      </Section>
    </>
  );
}
