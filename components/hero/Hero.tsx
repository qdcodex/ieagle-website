import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import FadeIn from "./FadeIn";
import AnimatedHeading from "./AnimatedHeading";
import HeroNav from "./HeroNav";
import HeroSearch from "./HeroSearch";
import NetworkCard from "./NetworkCard";
import { SITE } from "@/lib/data";
import { BRAND, HOME } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      {SITE.heroImage ? (
        <img className="absolute inset-0 h-full w-full object-cover" src={SITE.heroImage} alt="" />
      ) : (
        <video className="absolute inset-0 h-full w-full object-cover" src={SITE.heroVideo} autoPlay loop muted playsInline />
      )}

      <div className="relative z-10 flex min-h-screen flex-col">
        <HeroNav />

        <div className="flex flex-1 flex-col justify-end px-6 pb-24 pt-10 md:px-12 lg:px-16 lg:pb-28">
          <div className="gap-10 lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <div>
              <FadeIn delay={100} duration={800}>
                <span className="liquid-glass mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm">
                  <Sparkles size={14} className="text-[#f7b800]" />
                  {BRAND.name} · {BRAND.tagline}
                </span>
              </FadeIn>

              <AnimatedHeading
                text={HOME.headline.join("\n")}
                className="hero-shadow mb-5 text-4xl font-normal leading-[1.05] text-white md:text-5xl xl:text-6xl"
                lineClassNames={["", "text-[#f7b800]", "", "text-[#f7b800]"]}
                charDelay={22}
              />

              <FadeIn delay={900} duration={1000}>
                <p className="hero-shadow mb-6 max-w-xl text-base text-gray-200 md:text-lg">{HOME.welcome}</p>
              </FadeIn>

              <FadeIn delay={1100} duration={1000}>
                <div className="mb-5 flex flex-wrap gap-4">
                  <Link href="/membership#apply" className="inline-flex items-center gap-2 rounded-lg bg-[#f7b800] px-8 py-3 font-semibold text-[#1a2a80] transition hover:-translate-y-0.5">
                    Become a Member <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/about"
                    className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Explore iEagles
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={1300} duration={1000}>
                <HeroSearch />
              </FadeIn>
            </div>

            <div className="mt-10 flex justify-start lg:mt-0 lg:justify-end">
              <FadeIn delay={1500} duration={1000} className="w-full max-w-md">
                <NetworkCard />
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
