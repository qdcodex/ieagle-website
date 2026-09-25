import { Building, Landmark, Rocket, Users, GraduationCap, BriefcaseBusiness, Newspaper, Trophy, Handshake, Megaphone, Eye, Network } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { Section, Heading, IconCard } from "@/components/blocks";
import { PARTNERSHIPS } from "@/lib/content";

export const metadata = { title: "Partnerships — iEagles Business Network" };

const ICONS = [Building, Landmark, Rocket, Users, GraduationCap, BriefcaseBusiness, Newspaper, Trophy];
const WHY = [
  { icon: Network, t: "Reach the network", d: "Connect with entrepreneurs, professionals and leaders across our chapters." },
  { icon: Eye, t: "Brand visibility", d: "Feature at iEagles events, in the magazine and across our platforms." },
  { icon: Megaphone, t: "Purpose-driven impact", d: "Support business growth and community initiatives together." },
];

export default function Partnerships() {
  return (
    <>
      <PageHero eyebrow="Partnerships" title={PARTNERSHIPS.title} crumb="Partnerships" subtitle="Collaborate with a growing community of entrepreneurs, professionals and leaders." />

      <Section>
        <Heading center eyebrow="Who we partner with" title="Partnerships are open for:" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERSHIPS.types.map((t, i) => (
            <IconCard key={t} icon={ICONS[i]} title={t} delay={i * 60} />
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <Heading center light eyebrow="Why partner with iEagles" title="Grow together, create impact" />
        <div className="grid gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <IconCard key={w.t} light icon={w.icon} title={w.t} text={w.d} delay={i * 80} />
          ))}
        </div>
      </Section>

      <Section id="become" tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="h-full rounded-3xl p-8 text-[#1a2a80] md:p-10" style={{ background: "linear-gradient(120deg,#f7b800,#ffd54a)" }}>
              <Handshake size={44} className="mb-5" />
              <h2 className="!text-4xl uppercase" style={{ letterSpacing: "-0.02em" }}>{PARTNERSHIPS.cta}</h2>
              <p className="mt-3 text-lg text-[#1a2a80]/80">Tell us about your organisation and how you would like to work with iEagles.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-[#e2e7ef] bg-[#f6f8fb] p-8 shadow-sm">
              <EnquiryForm topics={["Business Partnership", ...PARTNERSHIPS.types.map((t) => `Partnership — ${t}`)]} submitLabel={PARTNERSHIPS.cta} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
