import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Reveal from "@/components/home/Reveal";

const TONES = {
  plain: "",
  white: "bg-white",
  navy: "relative overflow-hidden text-white",
  gold: "text-[#1a2a80]",
};

const NAVY_BG = { background: "linear-gradient(160deg,#0f1a55 0%,#1a2a80 55%,#2c3fa8 100%)" };
const GOLD_BG = { background: "linear-gradient(120deg,#f7b800,#ffd54a)" };

/** Page section. tone: plain | white | navy | gold */
export function Section({ id = undefined, tone = "plain", className = "", children }) {
  const style = tone === "navy" ? NAVY_BG : tone === "gold" ? GOLD_BG : undefined;
  return (
    <section id={id} className={`scroll-mt-28 py-20 md:py-24 ${TONES[tone]} ${className}`} style={style}>
      {tone === "navy" && (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.4) 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }} />
          <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#f7b800]/20 blur-3xl" />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function Heading({ eyebrow = undefined, title, intro = undefined, center = false, light = false, className = "" }) {
  return (
    <Reveal className={`mb-12 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{eyebrow}</p>}
      <h2 className={`!text-3xl md:!text-[2.6rem] !leading-tight ${light ? "!text-white" : ""}`} style={{ letterSpacing: "-0.03em" }}>
        {title}
      </h2>
      {intro &&
        (Array.isArray(intro) ? intro : [intro]).map((p) => (
          <p key={p} className={`mt-4 text-lg ${light ? "text-white/80" : "text-[#5b6675]"}`}>
            {p}
          </p>
        ))}
    </Reveal>
  );
}

export function Btn({ href, children, variant = "navy", external = false, className = "" }) {
  const v = {
    navy: "bg-[#1a2a80] text-white hover:bg-[#2c3fa8]",
    gold: "bg-[#f7b800] text-[#1a2a80] hover:brightness-105",
    white: "bg-white text-[#1a2a80] hover:bg-[#f0f2f7]",
    ghost: "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-[#1a2a80]",
    outline: "border-2 border-[#1a2a80] text-[#1a2a80] hover:bg-[#1a2a80] hover:text-white",
    green: "bg-[#25d366] text-white hover:brightness-105",
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${v} ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Icon card. icon is a lucide component. */
export function IconCard({ icon: Icon = undefined, title, text = undefined, index = undefined, light = false, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`group relative h-full overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1.5 ${
          light
            ? "border border-white/15 bg-white/10 backdrop-blur hover:bg-white/15"
            : "border border-[#e2e7ef] bg-white shadow-sm hover:border-transparent hover:shadow-2xl"
        }`}
      >
        {index != null && (
          <span className={`absolute right-5 top-4 text-5xl font-semibold leading-none ${light ? "text-white/10" : "text-[#1a2a80]/[0.06]"}`}>
            {String(index).padStart(2, "0")}
          </span>
        )}
        {Icon && (
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7b800] text-[#1a2a80] shadow-md transition group-hover:scale-110 group-hover:rotate-3">
            <Icon size={24} />
          </div>
        )}
        <h3 className={`mb-2 text-xl ${light ? "!text-white" : ""}`}>{title}</h3>
        {text && <p className={light ? "text-white/75" : "text-[#5b6675]"}>{text}</p>}
      </div>
    </Reveal>
  );
}

/** Check-mark list in a responsive grid. */
export function CheckList({ items, cols = 2, light = false }) {
  const grid = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ul className={`m-0 grid list-none gap-3 p-0 ${grid}`}>
      {items.map((t, i) => (
        <Reveal key={t} delay={Math.min(i * 40, 400)}>
          <li
            className={`flex h-full items-start gap-3 rounded-xl px-4 py-3.5 ${
              light ? "border border-white/10 bg-white/10 text-white" : "border border-[#e2e7ef] bg-white text-[#1c2430] shadow-sm"
            }`}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f7b800] text-[#1a2a80]">
              <Check size={14} strokeWidth={3} />
            </span>
            <span className="font-medium">{t}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

/** Step flow: A → B → C (wraps on small screens). */
export function Flow({ steps, light = false, numbered = true }) {
  return (
    <ol className="m-0 flex list-none flex-wrap items-center justify-center gap-y-4 p-0">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <Reveal delay={i * 90}>
            <span
              className={`flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-md ${
                i === steps.length - 1 ? "bg-[#f7b800] text-[#1a2a80]" : light ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-white text-[#1a2a80] ring-1 ring-[#e2e7ef]"
              }`}
            >
              {numbered && (
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${i === steps.length - 1 ? "bg-[#1a2a80] text-white" : "bg-[#1a2a80] text-[#f7b800]"}`}>
                  {i + 1}
                </span>
              )}
              {s}
            </span>
          </Reveal>
          {i < steps.length - 1 && <ChevronRight className={`mx-1.5 shrink-0 ${light ? "text-[#f7b800]" : "text-[#f7b800]"}`} size={22} />}
        </li>
      ))}
    </ol>
  );
}

export function Chips({ items, light = false }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((t) => (
        <span
          key={t}
          className={`rounded-full px-4 py-2 text-sm font-medium ${light ? "border border-white/20 bg-white/10 text-white" : "border border-[#e2e7ef] bg-white text-[#1a2a80] shadow-sm"}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/** Gold call-to-action band. actions: [{ label, href, variant, external }] */
export function CtaBand({ title, text = undefined, actions = [] }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl px-8 py-12 text-[#1a2a80] shadow-xl md:px-12" style={GOLD_BG}>
        <img src="/logo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-6 hidden h-48 w-auto opacity-15 md:block" />
        <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="max-w-2xl">
            <h2 className="!text-3xl md:!text-4xl" style={{ letterSpacing: "-0.03em" }}>{title}</h2>
            {text && <p className="mt-2 text-lg text-[#1a2a80]/80">{text}</p>}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {actions.map((a) => (
              <Btn key={a.label} href={a.href} variant={a.variant ?? "navy"} external={a.external}>
                {a.icon ? <a.icon size={18} /> : null}
                {a.label}
                {!a.icon && <ArrowRight size={18} />}
              </Btn>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
