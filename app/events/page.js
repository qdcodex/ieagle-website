import { CalendarDays, MapPin, ArrowRight, Users, Mic, Landmark, Coffee, GraduationCap, Handshake, Trophy, HeartHandshake, Camera, Bell } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, CtaBand } from "@/components/blocks";
import { EVENTS_INFO } from "@/lib/content";
import { PAST_EVENTS, UPCOMING_EVENTS, wa } from "@/lib/data";

export const metadata = { title: "Events — iEagles Business Network" };

const TYPE_ICONS = [Users, Mic, Landmark, Coffee, GraduationCap, Handshake, Trophy, HeartHandshake];

export default function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title={EVENTS_INFO.title}
        crumb="Events"
        subtitle={EVENTS_INFO.intro}
        links={[
          { label: "Upcoming Events", href: "#upcoming" },
          { label: "Event Types", href: "#types" },
          { label: "Past Events", href: "#past" },
          { label: "Recognition & Awards", href: "/awards" },
        ]}
      />

      {/* Upcoming */}
      <Section id="upcoming">
        <Heading eyebrow="Mark your calendar" title="Upcoming Events" intro="Dates are confirmed with each chapter — register your interest and we will notify you." />
        <div className="grid gap-6 md:grid-cols-3">
          {UPCOMING_EVENTS.map((e, i) => {
            const Icon = TYPE_ICONS[EVENTS_INFO.types.indexOf(e.type)] ?? CalendarDays;
            return (
              <Reveal key={e.title} delay={i * 100}>
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e2e7ef] bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-2xl">
                  <div className="relative flex h-36 items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.5) 1.5px,transparent 1.5px)", backgroundSize: "18px 18px" }} />
                    <Icon size={48} className="relative text-[#f7b800] transition group-hover:scale-110" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#f7b800] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1a2a80]">Upcoming</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 text-xl">{e.title}</h3>
                    <p className="mb-1 flex items-center gap-2 text-sm text-[#5b6675]"><CalendarDays size={16} /> {e.date}</p>
                    <p className="mb-5 flex items-center gap-2 text-sm text-[#5b6675]"><MapPin size={16} /> {e.place}</p>
                    <a
                      className="mt-auto inline-flex items-center gap-2 font-semibold text-[#1a2a80] transition-all hover:gap-3"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={wa(`I would like to register for: ${e.title}`)}
                    >
                      Register interest <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Types */}
      <Section id="types" tone="navy">
        <Heading center light eyebrow="What we host" title={EVENTS_INFO.typesTitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS_INFO.types.map((t, i) => {
            const Icon = TYPE_ICONS[i];
            return (
              <Reveal key={t} delay={i * 60}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7b800] text-[#1a2a80]"><Icon size={26} /></span>
                  <h3 className="!text-white text-lg">{t}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="#upcoming" className="inline-flex items-center gap-2 rounded-xl bg-[#f7b800] px-6 py-3 font-semibold text-[#1a2a80] transition hover:-translate-y-0.5">
            View Upcoming Events <ArrowRight size={18} />
          </Link>
        </Reveal>
      </Section>

      {/* Past */}
      <Section id="past" tone="white">
        <Heading eyebrow="Look back" title="Past Events" />
        {PAST_EVENTS.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {PAST_EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 100}>
                <div className="overflow-hidden rounded-3xl border border-[#e2e7ef] bg-[#f6f8fb] shadow-sm">
                  {e.image ? <img src={e.image} alt={e.title} className="h-48 w-full object-cover" /> : <div className="flex h-48 items-center justify-center bg-[#1a2a80] text-white/70"><Camera size={36} /></div>}
                  <div className="p-6">
                    <h3 className="mb-2 text-xl">{e.title}</h3>
                    <p className="flex items-center gap-2 text-sm text-[#5b6675]"><CalendarDays size={15} /> {e.date}</p>
                    <p className="flex items-center gap-2 text-sm text-[#5b6675]"><MapPin size={15} /> {e.place}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="grid items-center gap-8 rounded-3xl border border-dashed border-[#e2e7ef] bg-[#f6f8fb] p-8 md:grid-cols-[auto_1fr] md:p-10">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1a2a80] text-[#f7b800]"><Camera size={36} /></span>
              <div>
                <h3 className="text-2xl">Event highlights coming soon</h3>
                <p className="mt-1 text-[#5b6675]">Photos and highlights from iEagles meetings, conclaves and award nights will be published here after each event.</p>
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      <Section className="!pt-0">
        <CtaBand
          title="Never miss an iEagles event"
          text="Get meeting and event updates on WhatsApp, or host an event with us as a sponsor."
          actions={[
            { label: "Get event updates", href: wa("Please send me iEagles event updates"), external: true, icon: Bell },
            { label: "Sponsor a Event", href: "/contact#sponsor", variant: "white" },
          ]}
        />
      </Section>
    </>
  );
}
