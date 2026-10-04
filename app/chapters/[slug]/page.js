import { notFound } from "next/navigation";
import Link from "next/link";
import { UserCheck, Users, Building2, CalendarClock, CalendarDays, Phone, Mail, MapPin, MessageCircle, ArrowRight, ArrowLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import ChapterMap from "@/components/ChapterMap";
import EnquiryForm from "@/components/EnquiryForm";
import { ChapterDirector, ChapterMemberCount, ChapterMemberCards } from "@/components/ChapterPeople";
import { Section, Heading } from "@/components/blocks";
import { CHAPTERS_INFO } from "@/lib/content";
import { CHAPTERS, CHAPTER_DETAILS, BUSINESSES, UPCOMING_EVENTS, SITE, wa } from "@/lib/data";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = CHAPTERS.find((x) => x.slug === slug);
  return { title: c ? `${c.name} Chapter — iEagles Business Network` : "Chapter — iEagles" };
}

function Box({ icon: Icon, title, children, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full rounded-2xl border border-[#e2e7ef] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a2a80] text-[#f7b800]"><Icon size={20} /></span>
          <h3 className="text-lg">{title}</h3>
        </div>
        <div className="text-[#5b6675]">{children}</div>
      </div>
    </Reveal>
  );
}

const TBA = ({ children }) => <p className="rounded-lg bg-[#f6f8fb] px-3 py-2 text-sm">{children}</p>;

export default async function ChapterProfile({ params }) {
  const { slug } = await params;
  const c = CHAPTERS.find((x) => x.slug === slug);
  if (!c) notFound();
  const d = CHAPTER_DETAILS[slug] ?? {};
  const businesses = BUSINESSES.filter((b) => b.chapter === c.name);
  const events = UPCOMING_EVENTS.filter((e) => e.place.includes(c.name) || e.place.includes(c.district));

  return (
    <>
      <PageHero eyebrow="Chapter Profile" title={`${c.name} Chapter`} crumb={`Chapters / ${c.name}`} subtitle={`${c.district}, ${c.state} · ${CHAPTERS_INFO.chapterTagline}`} />

      <Section>
        <Link href="/chapters#map" className="mb-8 inline-flex items-center gap-2 font-semibold text-[#1a2a80]">
          <ArrowLeft size={18} /> All chapters
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            <Box icon={UserCheck} title="Chapter Director">
              <ChapterDirector slug={c.slug} fallback={d.director} />
            </Box>
            <Box icon={Users} title="Members" delay={60}>
              <ChapterMemberCount slug={c.slug} />
            </Box>
            <Box icon={Building2} title="Businesses" delay={120}>
              {businesses.length ? (
                <ul className="m-0 list-none space-y-1.5 p-0">
                  {businesses.map((b) => (
                    <li key={b.company} className="flex items-center justify-between gap-2">
                      <span><b className="text-[#1a2a80]">{b.company}</b> · {b.industry}</span>
                      {b.sample && <span className="rounded bg-[#f7b800]/20 px-1.5 text-[10px] font-bold uppercase text-[#1a2a80]">Sample</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <TBA>No businesses listed yet</TBA>
              )}
              <Link href={`/business-directory?chapter=${encodeURIComponent(c.name)}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1a2a80]">
                View in directory <ArrowRight size={14} />
              </Link>
            </Box>
            <Box icon={CalendarClock} title="Upcoming meetings" delay={180}>
              {d.meetings?.length ? (
                <ul className="m-0 list-none space-y-1 p-0">
                  {d.meetings.map((m) => (
                    <li key={m.date}><b className="text-[#1a2a80]">{m.date}</b> {m.time} · {m.venue}</li>
                  ))}
                </ul>
              ) : (
                <TBA>Meeting schedule to be announced</TBA>
              )}
            </Box>
            <Box icon={CalendarDays} title="Events" delay={240}>
              {events.length ? (
                <ul className="m-0 list-none space-y-1 p-0">
                  {events.map((e) => (
                    <li key={e.title}><b className="text-[#1a2a80]">{e.title}</b> · {e.date}</li>
                  ))}
                </ul>
              ) : (
                <TBA>No events scheduled yet</TBA>
              )}
              <Link href="/events" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1a2a80]">All events <ArrowRight size={14} /></Link>
            </Box>
            <Box icon={Phone} title="Contact" delay={300}>
              <p className="flex items-center gap-2"><Phone size={15} /> {d.directorPhone ?? `Helpline: ${SITE.whatsappDisplay}`}</p>
              <p className="flex items-center gap-2 break-all"><Mail size={15} /> {SITE.email}</p>
              <p className="flex items-center gap-2"><MapPin size={15} /> {c.name}, {c.district}</p>
              <a href={wa(`Hello, I would like to know about the ${c.name} Chapter`)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-4 py-2 text-sm font-semibold text-white">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </Box>
          </div>

          <div className="space-y-6">
            <Reveal>
              <div className="rounded-3xl p-4 shadow-xl" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80)" }}>
                <ChapterMap active={c.slug} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div id="join" className="scroll-mt-28 rounded-3xl border border-[#e2e7ef] bg-white p-6 shadow-xl">
                <h2 className="mb-1 !text-2xl">Join Chapter</h2>
                <p className="mb-5 text-[#5b6675]">Become a member of the {c.name} Chapter.</p>
                <EnquiryForm mode="chapter" topics={[`Join the ${c.name} Chapter`]} submitLabel="Join Chapter" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Members — from the admin member list */}
      <Section id="members" tone="white">
        <Heading eyebrow={`${c.name} Chapter`} title="Our Members" intro="Entrepreneurs and professionals of this chapter." />
        <ChapterMemberCards slug={c.slug} chapterName={c.name} />
      </Section>

      <Section className="!py-14">
        <Heading eyebrow="Other chapters" title="Explore the network" className="!mb-6" />
        <div className="flex flex-wrap gap-3">
          {CHAPTERS.filter((x) => x.slug !== c.slug).map((x) => (
            <Link key={x.slug} href={`/chapters/${x.slug}`} className="inline-flex items-center gap-2 rounded-full border border-[#e2e7ef] bg-[#f6f8fb] px-5 py-2.5 font-semibold text-[#1a2a80] transition hover:bg-[#1a2a80] hover:text-white">
              <MapPin size={16} className="text-[#f7b800]" /> {x.name}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
