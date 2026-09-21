import { CalendarDays, MapPin, ArrowRight, Camera } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, SectionTitle, cardCls } from "@/components/ui";
import { PAST_EVENTS, UPCOMING_EVENTS, SITE } from "@/lib/data";

export const metadata = { title: "Events — iEagle" };

export default function Events() {
  return (
    <>
      <PageHero eyebrow="Events" title="Meet. Learn. Connect." subtitle="What we have done and what is coming next." />

      <Section id="upcoming">
        <SectionTitle eyebrow="Mark your calendar" title="Upcoming Events" />
        <div className="grid gap-6 md:grid-cols-3">
          {UPCOMING_EVENTS.map((e, i) => {
            const [month, year] = e.date.split(" ");
            return (
              <Reveal key={e.title} delay={i * 100}>
                <div className={`${cardCls} flex h-full flex-col`}>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-navy text-white">
                      <span className="text-xs uppercase tracking-widest text-gold">{year}</span>
                      <span className="text-2xl font-semibold">{month}</span>
                    </div>
                    <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">Upcoming</span>
                  </div>
                  <h3 className="mb-2 text-xl">{e.title}</h3>
                  <p className="mb-5 flex items-center gap-2 text-[#5b6675]"><MapPin size={16} /> {e.place}</p>
                  <a
                    className="mt-auto inline-flex items-center gap-2 font-semibold text-navy"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`I would like to register for: ${e.title}`)}`}
                  >
                    Register interest <ArrowRight size={16} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="past" alt>
        <SectionTitle eyebrow="Look back" title="Past Events" />
        <div className="grid gap-6 md:grid-cols-3">
          {PAST_EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 100}>
              <div className="group overflow-hidden rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div
                  className="flex h-40 items-center justify-center text-white/80"
                  style={{ background: `linear-gradient(135deg,#1a2a80,${["#2c3fa8", "#3b4fc2", "#0f1a55"][i % 3]})` }}
                >
                  <Camera size={36} className="transition group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl">{e.title}</h3>
                  <p className="flex items-center gap-2 text-sm text-[#5b6675]"><CalendarDays size={15} /> {e.date}</p>
                  <p className="flex items-center gap-2 text-sm text-[#5b6675]"><MapPin size={15} /> {e.place}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
