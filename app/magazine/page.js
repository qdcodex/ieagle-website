import {
  UserRound, Star, BookOpen, Lightbulb, Package, Crown, PenLine, Briefcase, HeartHandshake, Megaphone, MessageCircle,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { Section, Heading, Btn } from "@/components/blocks";
import { MAGAZINE, MAGAZINE_YEARS } from "@/lib/content";
import MagazineIssues from "@/components/MagazineIssues";
import { wa } from "@/lib/data";

export const metadata = { title: "Brand Your Business Magazine — iEagles Business Network" };

const FEATURE_ICONS = [UserRound, Star, BookOpen, Lightbulb, Package, Crown, PenLine, Briefcase, HeartHandshake, Megaphone];

export default function Magazine() {
  return (
    <>
      <PageHero
        eyebrow={MAGAZINE.name}
        title={MAGAZINE.title}
        crumb="Magazine"
        subtitle={MAGAZINE.body}
        topLabel="Year"
        topLinks={MAGAZINE_YEARS.map((y) => ({ label: String(y), href: `#year-${y}` }))}
        links={[
          { label: "Features", href: "#features" },
          { label: "Submit Your Story", href: "#submit" },
        ]}
      />

      {/* Features */}
      <Section id="features">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-32">
            <Heading eyebrow="Inside the magazine" title={MAGAZINE.featuresTitle} className="!mb-6" />
            <Reveal>
              <div className="relative mx-auto w-full max-w-[280px] rotate-[-3deg] overflow-hidden rounded-2xl p-6 text-white shadow-2xl transition hover:rotate-0" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 60%,#2c3fa8)", aspectRatio: "3 / 4" }}>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f7b800]">iEagles</p>
                <p className="text-3xl font-semibold leading-none">Brand Your Business</p>
                <img src="/logo.png" alt="" className="mx-auto mt-6 block h-32 w-auto" />
                <div className="absolute inset-x-6 bottom-6">
                  <div className="mb-2 h-1 w-12 rounded bg-[#f7b800]" />
                  <p className="text-sm text-white/80">{MAGAZINE.closing}</p>
                </div>
              </div>
            </Reveal>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {MAGAZINE.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <Reveal key={f} delay={i * 45}>
                    <div className="flex items-center gap-3 rounded-xl border border-[#e2e7ef] bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#f7b800] hover:shadow-lg">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a2a80] text-[#f7b800]"><Icon size={19} /></span>
                      <span className="font-medium">{f}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal className="mt-8 rounded-3xl p-8 text-[#1a2a80]" style={{ background: "linear-gradient(120deg,#f7b800,#ffd54a)" }}>
              <p className="text-2xl font-semibold md:text-3xl" style={{ letterSpacing: "-0.02em" }}>{MAGAZINE.closing}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn href="/contact#advertise"><Megaphone size={18} /> Advertise With Us</Btn>
                <Btn href="#submit" variant="white"><PenLine size={18} /> Submit Your Story</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Issues by year */}
      <Section id="issues" tone="white">
        <Heading eyebrow="Read & download" title="Published magazines" intro="Choose a year to see the issues published that year." className="!mb-8" />
        <MagazineIssues />
      </Section>

      {/* Submit */}
      <Section id="submit">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Heading eyebrow="Get featured" title="Submit Your Story" intro="Share your founder story, business milestone, product launch or an expert article. Our team will contact you about the next issue." className="!mb-6" />
            <Reveal className="flex flex-wrap gap-3">
              <Btn href={wa("Please add me to the iEagles magazine and newsletter list")} external variant="green"><MessageCircle size={18} /> Subscribe on WhatsApp</Btn>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-[#e2e7ef] bg-white p-8 shadow-xl">
              <EnquiryForm topics={["Submit Your Story", "Advertise With Us", "Media Enquiry"]} submitLabel="Send to the editorial team" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
