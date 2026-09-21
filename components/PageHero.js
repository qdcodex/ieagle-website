import Link from "next/link";

export default function PageHero({ title, subtitle, eyebrow }) {
  return (
    <div
      className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(135deg,#1a2a80 0%,#2c3fa8 60%,#1a2a80 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.35) 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }}
      />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f7b800]/20 blur-3xl" />
      <img src="/logo.png" alt="" aria-hidden="true" className="absolute -bottom-6 right-6 hidden h-56 w-auto opacity-20 md:block" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <nav className="mb-4 flex items-center gap-2 text-sm text-white/70" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#f7b800]">Home</Link>
          <span>/</span>
          <span className="text-white">{title}</span>
        </nav>
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#f7b800]">{eyebrow}</p>}
        <h1 className="!text-white text-4xl md:text-5xl" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-white/80">{subtitle}</p>}
        <div className="mt-6 h-1 w-20 rounded bg-[#f7b800]" />
      </div>
    </div>
  );
}
