"use client";
import { useCallback, useEffect, useState } from "react";
import { Camera, CalendarDays, MapPin, Images, X, ChevronLeft, ChevronRight } from "lucide-react";

const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const monthYear = (d) => new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

function Lightbox({ event, onClose }) {
  const [i, setI] = useState(0);
  const n = event.photos.length;
  const go = useCallback((step) => setI((x) => (x + step + n) % n), [n]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open"); // hides the floating buttons
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (n > 1 && e.key === "ArrowRight") go(1);
      if (n > 1 && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", key);
    };
  }, [go, n, onClose]);

  const arrow = "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white/15 text-white backdrop-blur transition hover:bg-white/30";

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-[#060b24]/95 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={event.title} onClick={onClose}>
      <div className="flex items-start justify-between gap-4 px-5 py-4 text-white" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{event.title}</p>
          <p className="flex flex-wrap gap-x-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} /> {fmt(event.date)}</span>
            {event.place && <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {event.place}</span>}
          </p>
        </div>
        <button onClick={onClose} aria-label="Close gallery" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-0 bg-white/15 text-white hover:bg-white/30"><X size={20} /></button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
        {n ? (
          <img key={event.photos[i].id} src={event.photos[i].url} alt={`${event.title} — photo ${i + 1}`} className="max-h-full max-w-full rounded-xl object-contain shadow-2xl" style={{ animation: "feedIn .25s ease both" }} />
        ) : (
          <p className="text-white/70">No photos for this event yet.</p>
        )}
        {n > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous photo" className={`${arrow} left-3 md:left-6`}><ChevronLeft size={24} /></button>
            <button onClick={() => go(1)} aria-label="Next photo" className={`${arrow} right-3 md:right-6`}><ChevronRight size={24} /></button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">{i + 1} / {n}</span>
          </>
        )}
      </div>

      <div className="px-5 pb-5 pt-3" onClick={(e) => e.stopPropagation()}>
        {n > 1 && (
          <div className="mx-auto mb-3 flex max-w-4xl gap-2 overflow-x-auto pb-1">
            {event.photos.map((p, k) => (
              <button key={p.id} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 p-0 transition ${k === i ? "border-[#f7b800]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={p.url} alt="" loading="lazy" className="block h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
        {event.description && <p className="mx-auto max-h-24 max-w-3xl overflow-auto whitespace-pre-line text-center text-sm text-white/80">{event.description}</p>}
      </div>
    </div>
  );
}

function Card({ e, featured, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className={`group relative block overflow-hidden rounded-3xl border-0 bg-[#1a2a80] p-0 text-left shadow-lg transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${featured ? "md:col-span-2 lg:row-span-2" : ""}`}
    >
      <div className={`relative w-full ${featured ? "h-72 lg:h-full lg:min-h-[34rem]" : "h-64"}`}>
        {e.cover ? (
          <img src={e.cover} alt={e.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-white/40" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}><Camera size={48} /></span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b24] via-[#060b24]/40 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[#f7b800] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1a2a80]">{monthYear(e.date)}</span>
        {e.photos.length > 0 && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <Images size={13} /> {e.photos.length}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
          <h3 className={`!text-white ${featured ? "text-2xl md:text-3xl" : "text-xl"}`} style={{ letterSpacing: "-0.02em" }}>{e.title}</h3>
          {e.place && <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75"><MapPin size={14} /> {e.place}</p>}
          {e.description && <p className={`mt-2 text-sm text-white/80 ${featured ? "line-clamp-3 max-w-2xl" : "line-clamp-2"}`}>{e.description}</p>}
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#f7b800] transition-all group-hover:gap-2">View photos →</span>
        </div>
      </div>
    </button>
  );
}

/** Past events gallery. Shows `fallback` when there are no events (or the database is unreachable). */
export default function PastEventsGallery({ fallback = null }) {
  const [events, setEvents] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetch("/api/events/past")
      .then((r) => r.json())
      .then((d) => setEvents(d.events ?? []))
      .catch(() => setEvents([]));
  }, []);

  if (!events) return <p className="py-10 text-center text-[#5b6675]">Loading events…</p>;
  if (!events.length) return fallback;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => (
          <Card key={e.id} e={e} featured={i === 0 && events.length > 2} onOpen={() => setOpen(e)} />
        ))}
      </div>
      {open && <Lightbox event={open} onClose={() => setOpen(null)} />}
    </>
  );
}
