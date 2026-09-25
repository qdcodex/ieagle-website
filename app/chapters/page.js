import {
  CalendarCheck, Network, BookOpen, Presentation, UserPlus, Share2, Building2, HeartHandshake, MapPin, ArrowRight, Flag, Search,
} from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import ChapterMap from "@/components/ChapterMap";
import EnquiryForm from "@/components/EnquiryForm";
import { Section, Heading, Btn } from "@/components/blocks";
import { CHAPTERS_INFO } from "@/lib/content";
import { STATES, CHAPTERS } from "@/lib/data";

export const metadata = { title: "Chapters — iEagles Business Network" };

const ACTIVITY_ICONS = [CalendarCheck, Network, BookOpen, Presentation, UserPlus, Share2, Building2, HeartHandshake];

export default function Chapters() {
  return (
    <>
      <PageHero
        eyebrow="Chapters"
        title={CHAPTERS_INFO.title}
        crumb="Chapters"
        subtitle={CHAPTERS_INFO.body[0]}
        links={[
          { label: "Chapter Map", href: "#map" },
          { label: "State", href: "#state" },
          { label: "District", href: "#district" },
          { label: "Start a Chapter", href: "#start" },
        ]}
      />

      {/* Intro + activities */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Heading eyebrow={CHAPTERS_INFO.chapterTitle} title={CHAPTERS_INFO.chapterTagline} intro={CHAPTERS_INFO.body} className="!mb-8" />
            <Reveal className="flex flex-wrap gap-3">
              <Btn href="#map"><Search size={18} /> Find a Chapter</Btn>
              <Btn href="#start" variant="outline"><Flag size={18} /> Start a Chapter</Btn>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h3 className="mb-5 text-xl">{CHAPTERS_INFO.activitiesIntro}</h3>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {CHAPTERS_INFO.activities.map((a, i) => {
                const Icon = ACTIVITY_ICONS[i];
                return (
                  <Reveal key={a} delay={i * 50}>
                    <div className="flex items-center gap-3 rounded-xl border border-[#e2e7ef] bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a2a80] text-[#f7b800]"><Icon size={19} /></span>
                      <span className="font-medium">{a}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section id="map" tone="navy">
        <Heading center light eyebrow="Chapter Map" title={CHAPTERS_INFO.mapTitle} intro="Click a chapter to open its profile." />
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur md:p-6">
              <ChapterMap />
              <p className="mt-2 text-center text-xs text-white/50">Schematic map — not to scale.</p>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">Tamil Nadu</p>
              <h3 className="mb-5 !text-white text-2xl">Kanyakumari District</h3>
            </Reveal>
            <div className="grid gap-2.5">
              {CHAPTERS.map((c, i) => (
                <Reveal key={c.slug} delay={i * 60}>
                  <Link
                    href={`/chapters/${c.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/10 px-4 py-3 transition hover:border-[#f7b800] hover:bg-white/15"
                  >
                    <span className="flex items-center gap-3 font-semibold">
                      <MapPin size={18} className="text-[#f7b800]" /> {c.name}
                    </span>
                    <ArrowRight size={18} className="text-white/60 transition group-hover:translate-x-1 group-hover:text-[#f7b800]" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* State */}
      <Section id="state" tone="white">
        <Heading eyebrow="Browse by" title="State" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((s) => {
            const chapters = s.districts.reduce((n, d) => n + d.chapters.length, 0);
            return (
              <Reveal key={s.name}>
                <div className="rounded-3xl p-8 text-white shadow-xl" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
                  <MapPin size={30} className="mb-4 text-[#f7b800]" />
                  <h3 className="!text-white text-2xl">{s.name}</h3>
                  <p className="mt-1 text-white/75">
                    {s.districts.length} district{s.districts.length > 1 ? "s" : ""} · {chapters} chapters
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.districts.map((d) => (
                      <a key={d.name} href="#district" className="rounded-full bg-white/15 px-3 py-1 text-sm hover:bg-[#f7b800] hover:text-[#1a2a80]">
                        {d.name}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
          <Reveal delay={100}>
            <a href="#start" className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#e2e7ef] p-8 text-center text-[#5b6675] transition hover:border-[#f7b800] hover:text-[#1a2a80]">
              <Flag size={28} className="mb-3 text-[#f7b800]" />
              <span className="font-semibold">More states coming soon</span>
              <span className="text-sm">Start a chapter in your area</span>
            </a>
          </Reveal>
        </div>
      </Section>

      {/* District */}
      <Section id="district">
        <Heading eyebrow="Browse by" title="District" />
        {STATES.flatMap((s) =>
          s.districts.map((d) => (
            <Reveal key={d.name}>
              <div className="rounded-3xl border border-[#e2e7ef] bg-white p-8 shadow-sm">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{s.name}</p>
                    <h3 className="text-2xl">{d.name}</h3>
                  </div>
                  <span className="rounded-full bg-[#1a2a80]/10 px-4 py-1.5 text-sm font-semibold text-[#1a2a80]">{d.chapters.length} chapters</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {d.chapters.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/chapters/${c.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-[#e2e7ef] bg-[#f6f8fb] px-5 py-4 transition hover:border-transparent hover:bg-[#1a2a80] hover:text-white hover:shadow-xl"
                    >
                      <span className="flex items-center gap-3 font-semibold">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7b800] text-[#1a2a80]"><MapPin size={16} /></span>
                        {c.name}
                      </span>
                      <ArrowRight size={18} className="transition group-hover:translate-x-1 group-hover:text-[#f7b800]" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))
        )}
      </Section>

      {/* Start / join */}
      <Section id="start" tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Heading eyebrow="Grow the network" title="Start a Chapter or Join a Chapter" intro="Bring iEagles to your town, or join the chapter nearest to you. Tell us where you are and we will get in touch." className="!mb-6" />
            <div className="rounded-2xl border-l-4 border-[#f7b800] bg-[#f6f8fb] p-5">
              <p className="font-semibold text-[#1a2a80]">{CHAPTERS_INFO.chapterTagline}</p>
              <p className="text-[#5b6675]">Each chapter is a local platform connected to the wider iEagles ecosystem.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-[#e2e7ef] bg-[#f6f8fb] p-8 shadow-sm">
              <EnquiryForm mode="chapter" topics={["Join a Chapter", "Start a Chapter", "Chapter Enquiry"]} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
