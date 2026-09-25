import {
  UserRound, Star, BookOpen, Lightbulb, Package, Crown, PenLine, Briefcase, HeartHandshake, Megaphone, Download, MessageCircle,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { Section, Heading, Btn } from "@/components/blocks";
import { MAGAZINE } from "@/lib/content";
import { wa } from "@/lib/data";

export const metadata = { title: "Brand Your Business Magazine — iEagles Business Network" };

const FEATURE_ICONS = [UserRound, Star, BookOpen, Lightbulb, Package, Crown, PenLine, Briefcase, HeartHandshake, Megaphone];

const ISSUES = [
  { id: "sep-oct-2026", label: "Sep, 2026 - Oct, 2026", n: "Issue 01" },
  { id: "nov-dec-2026", label: "Nov, 2026 - Dec, 2026", n: "Issue 02" },
];

export default function Magazine() {
  return (
    <>
      <PageHero
        eyebrow={MAGAZINE.name}
        title={MAGAZINE.title}
        crumb="Magazine"
        subtitle={MAGAZINE.body}
        links={[
          { label: "Features", href: "#features" },
          { label: "Sep–Oct 2026", href: "#sep-oct-2026" },
          { label: "Nov–Dec 2026", href: "#nov-dec-2026" },
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
                <img src="/logo.png" alt="" className="mx-auto mt-6 h-32 w-auto" />
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

      {/* Issues */}
      <Section tone="white">
        <Heading eyebrow="Read & download" title="Latest issues" />
        <div className="grid gap-8 lg:grid-cols-2">
          {ISSUES.map((it, i) => (
            <Reveal key={it.id} delay={i * 120}>
              <div id={it.id} className="flex scroll-mt-28 flex-col gap-6 overflow-hidden rounded-3xl border border-[#e2e7ef] bg-[#f6f8fb] p-6 shadow-sm transition hover:shadow-xl sm:flex-row">
                <div className="relative flex h-60 w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-2xl p-5 text-white shadow-lg sm:w-44" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 60%,#2c3fa8)" }}>
                  <p className="self-start text-[10px] font-bold uppercase tracking-[0.25em] text-[#f7b800]">Brand Your Business</p>
                  <img src="/logo.png" alt="" className="h-16 w-auto" />
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-widest text-[#f7b800]">{it.n}</p>
                    <p className="text-sm font-semibold">{it.label}</p>
                  </div>
                  <div className="h-1 w-12 rounded bg-[#f7b800]" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#f7b800]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a2a80]">
                    <BookOpen size={12} /> Magazine & Newsletter
                  </span>
                  <h3 className="mb-2 text-2xl">{it.label}</h3>
                  <p className="mb-5 text-[#5b6675]">Entrepreneur profiles, member spotlights, business stories and opportunities from across the network.</p>
                  <a className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#1a2a80] px-6 py-3 font-semibold text-white transition hover:bg-[#2c3fa8]" href={`/newsletters/${it.id}.pdf`}>
                    <Download size={18} /> Download PDF
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
