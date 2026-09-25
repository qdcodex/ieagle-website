import { HeartHandshake, Heart, Bell, BadgeCheck, Users, Sprout, HandHeart } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, Btn } from "@/components/blocks";
import { CSR } from "@/lib/content";
import { wa } from "@/lib/data";

export const metadata = { title: "Social Responsibility — iEagles Business Network" };

export default function SocialResponsibility() {
  return (
    <>
      <PageHero eyebrow="Social Responsibility" title={CSR.title} crumb="Social Responsibility" subtitle={CSR.body[0]} />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading eyebrow={CSR.foundation} title="Serving communities, supporting meaningful causes" intro={CSR.body} className="!mb-8" />
            <Reveal className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Users, t: "Community initiatives" },
                { icon: Sprout, t: "Meaningful causes" },
                { icon: HandHeart, t: "Serve the society in need" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex flex-col items-center rounded-2xl border border-[#e2e7ef] bg-white p-5 text-center shadow-sm">
                  <Icon className="mb-2 text-[#f7b800]" size={28} />
                  <span className="font-semibold text-[#1a2a80]">{t}</span>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl p-10 text-center text-white shadow-2xl" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 55%,#2c3fa8)" }}>
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#f7b800]/25 blur-3xl" />
              <span className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7b800] text-[#1a2a80] shadow-[0_0_40px_rgba(247,184,0,.5)]">
                <Heart size={36} fill="currentColor" />
              </span>
              <h2 className="relative !text-3xl !text-white">{CSR.donate}</h2>
              <p className="relative mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                <BadgeCheck size={16} className="text-[#f7b800]" /> {CSR.tax}
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Btn href={wa(`I would like to donate to the ${CSR.foundation}`)} external variant="gold">
                  <HeartHandshake size={18} /> Donate Now
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" className="!py-16">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-dashed border-[#e2e7ef] bg-[#f6f8fb] p-10 text-center">
            <Bell size={32} className="text-[#f7b800]" />
            <h3 className="text-2xl">{CSR.stayTuned}</h3>
            <p className="text-[#5b6675]">Upcoming initiatives by the {CSR.foundation} will be announced here.</p>
            <Btn href={wa("Please keep me updated on iEagles community initiatives")} external variant="outline">Get updates</Btn>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
