import Link from "next/link";

/**
 * Inner-page banner. links: optional in-page jump links [{ label, href }].
 * topLinks: optional row shown on its own line above them (e.g. magazine years), with topLabel in front.
 */
export default function PageHero({ title, subtitle, eyebrow, crumb, links, topLinks, topLabel }) {
  return (
    <div className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#0f1a55 0%,#1a2a80 45%,#2c3fa8 100%)" }}>
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.35) 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }}
      />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f7b800]/25 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#2c3fa8]/60 blur-3xl" />
      <img src="/logo.png" alt="" aria-hidden="true" className="absolute -bottom-8 right-6 hidden h-60 w-auto opacity-20 md:block" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <nav className="mb-4 flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#f7b800]">Home</Link>
          <span>/</span>
          <span className="text-white">{crumb ?? title}</span>
        </nav>
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{eyebrow}</p>}
        <h1 className="max-w-3xl !text-white text-4xl md:text-6xl" style={{ letterSpacing: "-0.035em", lineHeight: 1.05 }}>{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>}
        <div className="mt-6 h-1 w-20 rounded bg-[#f7b800]" />
        {topLinks?.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {topLabel && <span className="mr-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{topLabel}</span>}
            {topLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full bg-[#f7b800] px-5 py-1.5 text-sm font-semibold text-[#1a2a80] transition hover:bg-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
        {links?.length > 0 && (
          <div className={`flex flex-wrap gap-2 ${topLinks?.length > 0 ? "mt-3" : "mt-8"}`}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur transition hover:bg-[#f7b800] hover:text-[#1a2a80]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
