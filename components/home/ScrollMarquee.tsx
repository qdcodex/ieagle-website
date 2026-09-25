"use client";
import { useEffect, useRef } from "react";
import { HOME, BRAND } from "@/lib/content";

/**
 * Two bands of text that slide horizontally as the page scrolls (plus a slow drift).
 * The phrase passing the centre of the screen lights up.
 */
export default function ScrollMarquee() {
  const section = useRef<HTMLElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    const r1 = row1.current;
    const r2 = row2.current;
    if (!el || !r1 || !r2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = Array.from(r1.querySelectorAll<HTMLElement>("[data-word]"));
    let raf = 0;
    let visible = false;
    let drift = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!reduce) drift += dt * 0.04;
      const shift = drift + window.scrollY * 0.55;
      const l1 = r1.scrollWidth / 2;
      const l2 = r2.scrollWidth / 2;
      r1.style.transform = `translate3d(${-(shift % l1)}px,0,0)`;
      r2.style.transform = `translate3d(${-l2 + ((shift * 0.8) % l2)}px,0,0)`;
      const mid = window.innerWidth / 2;
      for (const w of words) {
        const b = w.getBoundingClientRect();
        w.classList.toggle("on", b.left < mid + 60 && b.right > mid - 60);
      }
      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const phrases = [...HOME.headline, ...HOME.headline];
  const pillars = Array(4).fill(BRAND.pillars).flat();

  return (
    <section
      ref={section}
      aria-label={HOME.headline.join(" ")}
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(160deg,#0f1a55 0%,#1a2a80 55%,#2c3fa8 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.4) 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7b800]/15 blur-3xl" />

      {/* main row: the four headline phrases */}
      <div className="relative -rotate-2" aria-hidden="true">
        <div ref={row1} className="flex w-max items-center whitespace-nowrap will-change-transform">
          {[...phrases, ...phrases].map((p, i) => (
            <span key={i} className="flex items-center">
              <span data-word className="mq-word px-6 text-5xl font-semibold md:px-10 md:text-7xl lg:text-8xl" style={{ letterSpacing: "-0.04em" }}>
                {p}
              </span>
              <img src="/logo.png" alt="" className="h-10 w-auto opacity-90 md:h-16" />
            </span>
          ))}
        </div>
      </div>

      {/* counter row: Connect • Grow • Serve • Transform, moving the other way */}
      <div className="relative mt-8 rotate-1 border-y border-white/10 bg-[#f7b800] py-4 md:mt-12" aria-hidden="true">
        <div ref={row2} className="flex w-max items-center whitespace-nowrap will-change-transform">
          {[...pillars, ...pillars].map((p, i) => (
            <span key={i} className="flex items-center text-xl font-bold uppercase tracking-[0.25em] text-[#1a2a80] md:text-2xl">
              <span className="px-6">{p}</span>
              <span className="text-[#1a2a80]/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
