import { UserRound, Building2, Users, Briefcase, Package, MapPin, Phone, Globe, FileText, Image as ImageIcon, BadgeCheck, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import BusinessExplorer from "@/components/BusinessExplorer";
import { Section, Heading, CtaBand } from "@/components/blocks";
import { DIRECTORY_INFO } from "@/lib/content";
import { SITE, wa } from "@/lib/data";

export const metadata = { title: "Business Directory — iEagles Business Network" };

const FEATURE_ICONS = [UserRound, Building2, Users, Briefcase, Package, MapPin, Phone, Globe, FileText];
const PROFILE_ICONS = [ImageIcon, UserRound, Building2, BadgeCheck, Building2];

export default function BusinessDirectory() {
  return (
    <>
      <PageHero
        eyebrow="iEagles Business Directory"
        title={DIRECTORY_INFO.title}
        crumb="Business Directory"
        subtitle={DIRECTORY_INFO.body}
        links={[
          { label: "Search the directory", href: "#search" },
          { label: "Directory Features", href: "#features" },
          { label: "List your business", href: "#enroll" },
        ]}
      />

      <Section id="search" className="!pt-14">
        <BusinessExplorer />
      </Section>

      <Section id="features" tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading eyebrow="What each listing includes" title={DIRECTORY_INFO.featuresTitle} className="!mb-8" />
            <div className="grid gap-3 sm:grid-cols-2">
              {DIRECTORY_INFO.features.map((t, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <Reveal key={t} delay={i * 45}>
                    <div className="flex items-center gap-3 rounded-xl border border-[#e2e7ef] bg-[#f6f8fb] px-4 py-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1a2a80] text-[#f7b800]"><Icon size={17} /></span>
                      <span className="font-medium">{t}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <div>
            <Heading eyebrow="Member digital profile" title={DIRECTORY_INFO.profileTitle} className="!mb-8" />
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-[#e2e7ef] bg-white shadow-xl">
                <div className="h-20" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }} />
                <div className="relative -mt-10 px-6 pb-6">
                  <span className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-[#f7b800] text-[#1a2a80] shadow-lg"><ImageIcon size={30} /></span>
                  <ul className="m-0 mt-5 grid list-none gap-2 p-0">
                    {DIRECTORY_INFO.profile.map((p, i) => {
                      const Icon = PROFILE_ICONS[i];
                      return (
                        <li key={p} className="flex items-center gap-3 rounded-xl bg-[#f6f8fb] px-4 py-2.5 font-medium text-[#1a2a80]">
                          <Icon size={17} className="text-[#f7b800]" /> {p}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="enroll" className="!pt-0 !mt-20">
        <CtaBand
          title={DIRECTORY_INFO.cta}
          text={`List your business in the iEagles Business Directory — WA: ${SITE.whatsappDisplay}`}
          actions={[
            { label: "Enroll now", href: "/membership#apply" },
            { label: `WA: ${SITE.whatsappDisplay}`, href: wa("I would like to list my business in the iEagles directory"), external: true, variant: "green", icon: MessageCircle },
          ]}
        />
      </Section>
    </>
  );
}
