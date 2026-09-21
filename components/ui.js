import Reveal from "@/components/home/Reveal";

export function SectionTitle({ eyebrow, title, center = false }) {
  return (
    <Reveal className={`mb-10 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>}
      <h2 className="!text-3xl md:!text-4xl" style={{ letterSpacing: "-0.03em" }}>{title}</h2>
    </Reveal>
  );
}

export function Section({ id, alt = false, children }) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 ${alt ? "bg-white" : ""}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export const cardCls =
  "rounded-2xl border border-[#e2e7ef] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl";
