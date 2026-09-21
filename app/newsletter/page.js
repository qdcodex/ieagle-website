import { Download, BookOpen, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, SectionTitle } from "@/components/ui";
import { SITE } from "@/lib/data";

export const metadata = { title: "Newsletter — iEagle" };

const ISSUES = [
  { id: "sep-oct-2026", label: "Sep, 2026 - Oct, 2026", n: "Issue 01" },
  { id: "nov-dec-2026", label: "Nov, 2026 - Dec, 2026", n: "Issue 02" },
];

export default function Newsletter() {
  return (
    <>
      <PageHero eyebrow="Newsletter" title="Stories from our network" subtitle="Bi-monthly updates from our chapters." />

      <Section>
        <SectionTitle eyebrow="Read & download" title="Latest issues" />
        <div className="grid gap-10 lg:grid-cols-2">
          {ISSUES.map((it, i) => (
            <Reveal key={it.id} delay={i * 120}>
              <div id={it.id} className="scroll-mt-28 flex flex-col gap-6 overflow-hidden rounded-2xl border border-[#e2e7ef] bg-white p-6 shadow-sm transition hover:shadow-xl sm:flex-row">
                <div
                  className="relative flex h-56 w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-xl p-5 text-white shadow-lg sm:w-40"
                  style={{ background: "linear-gradient(160deg,#1a2a80,#2c3fa8)" }}
                >
                  <img src="/logo.png" alt="" className="h-14 w-auto" />
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-widest text-gold">{it.n}</p>
                    <p className="text-sm font-semibold">{it.label}</p>
                  </div>
                  <div className="h-1 w-12 rounded bg-gold" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                    <BookOpen size={12} /> Newsletter
                  </span>
                  <h3 className="mb-2 text-2xl">{it.label}</h3>
                  <p className="mb-5 text-[#5b6675]">Member stories, chapter news and opportunities. Add the PDF at /public/newsletters/{it.id}.pdf.</p>
                  <a className="inline-flex w-fit items-center gap-2 rounded-lg bg-navy px-6 py-3 font-medium text-white transition hover:bg-[#2c3fa8]" href={`/newsletters/${it.id}.pdf`}>
                    <Download size={18} /> Download PDF
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl px-8 py-8 text-navy md:flex-row" style={{ background: "linear-gradient(120deg,#f7b800,#ffd54a)" }}>
            <div>
              <h3 className="text-2xl">Get the next issue on WhatsApp</h3>
              <p className="text-navy/80">Message us to be added to the newsletter list.</p>
            </div>
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-medium text-white"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Please add me to the newsletter list")}`}
            >
              <MessageCircle size={18} /> Subscribe
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
