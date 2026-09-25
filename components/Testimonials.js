import { Quote, Star } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  const { author } = TESTIMONIALS;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TESTIMONIALS.items.map((q, i) => (
        <Reveal key={q} delay={i * 110}>
          <figure className={`relative flex h-full flex-col rounded-3xl p-8 shadow-lg ${i === 1 ? "bg-[#1a2a80] text-white" : "border border-[#e2e7ef] bg-white"}`}>
            <Quote size={36} className={i === 1 ? "mb-4 text-[#f7b800]" : "mb-4 text-[#f7b800]"} />
            <div className="mb-3 flex gap-0.5 text-[#f7b800]">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className={`flex-1 text-lg leading-relaxed ${i === 1 ? "text-white" : "text-[#1c2430]"}`}>“{q}”</blockquote>
            <figcaption className={`mt-6 flex items-center gap-3 border-t pt-5 ${i === 1 ? "border-white/15" : "border-[#e2e7ef]"}`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7b800] font-semibold text-[#1a2a80]">
                {author.name.replace(/^Mr\.\s*/, "").charAt(0)}
              </span>
              <span>
                <span className={`block font-semibold ${i === 1 ? "text-white" : "text-[#1a2a80]"}`}>{author.name}</span>
                <span className={`block text-sm ${i === 1 ? "text-white/70" : "text-[#5b6675]"}`}>{author.company}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
