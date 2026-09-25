import {
  Rocket, Briefcase, UserCheck, Lightbulb, Store, Factory, Wrench, ClipboardList, Award, Sprout, TrendingUp,
  Network, LineChart, Megaphone, GraduationCap, Handshake, Crown, HeartHandshake, Info, LogIn, MessageCircle,
} from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Section, Heading, IconCard } from "@/components/blocks";
import MembershipTiers from "@/components/MembershipTiers";
import WhyJoin from "@/components/WhyJoin";
import Testimonials from "@/components/Testimonials";
import EnquiryForm from "@/components/EnquiryForm";
import { MEMBERSHIP, BENEFITS, WHY_JOIN, TESTIMONIALS, HOME } from "@/lib/content";
import { wa } from "@/lib/data";

export const metadata = { title: "Membership — iEagles Business Network" };

const WHO_ICONS = [Rocket, Briefcase, UserCheck, Lightbulb, Store, Factory, Wrench, ClipboardList, Award, Sprout, TrendingUp];
const BENEFIT_ICONS = [Network, LineChart, Megaphone, GraduationCap, Rocket, Handshake, Crown, HeartHandshake];

export default function Membership() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title={MEMBERSHIP.title}
        crumb="Membership"
        subtitle={MEMBERSHIP.intro}
        links={[
          { label: "Who Can Join?", href: "#who" },
          { label: "Categories", href: "#categories" },
          { label: "What Members Get", href: "#benefits" },
          { label: "Why Join", href: "#why-join" },
          { label: "Testimonials", href: "#testimonials" },
          { label: "Apply", href: "#apply" },
        ]}
      />

      {/* Who can join */}
      <Section id="who">
        <Heading center eyebrow="Eligibility" title={MEMBERSHIP.whoTitle} />
        <div className="flex flex-wrap justify-center gap-3">
          {MEMBERSHIP.who.map((w, i) => {
            const Icon = WHO_ICONS[i];
            return (
              <Reveal key={w} delay={i * 45}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-[#e2e7ef] bg-white py-2 pl-2 pr-5 font-medium text-[#1a2a80] shadow-sm transition hover:-translate-y-0.5 hover:border-[#f7b800] hover:shadow-lg">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a2a80] text-[#f7b800]"><Icon size={17} /></span>
                  {w}
                </span>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Categories */}
      <Section id="categories" tone="white">
        <Heading center eyebrow="Choose your level" title={MEMBERSHIP.categoriesTitle} intro={MEMBERSHIP.categories.map((c) => c.t).join("  |  ")} />
        <MembershipTiers />
        <Reveal className="mt-8 flex items-start justify-center gap-2 text-center text-sm text-[#5b6675]">
          <Info size={16} className="mt-0.5 shrink-0" /> Benefits, privileges and eligibility details for each category will be shared on enquiry.
        </Reveal>
      </Section>

      {/* Benefits */}
      <Section id="benefits">
        <Heading center eyebrow="What Members Get" title={BENEFITS.title} intro={BENEFITS.intro} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.items.map((b, i) => (
            <IconCard key={b.t} icon={BENEFIT_ICONS[i]} title={b.t} text={b.d} delay={i * 60} />
          ))}
        </div>
      </Section>

      {/* Why join */}
      <Section id="why-join" tone="navy">
        <Heading center light eyebrow="Why Join iEagles?" title={WHY_JOIN.title} intro={WHY_JOIN.intro} />
        <WhyJoin light />
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" tone="white">
        <Heading center eyebrow="Testimonials" title={TESTIMONIALS.title} />
        <Testimonials />
      </Section>

      {/* Apply */}
      <Section id="apply">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl p-8 text-white md:p-10" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 55%,#2c3fa8)" }}>
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#f7b800]/25 blur-3xl" />
              <img src="/logo.png" alt="" className="relative mb-6 h-20 w-auto" />
              <h2 className="relative !text-3xl !text-white">Apply for Membership</h2>
              <p className="relative mt-3 text-lg text-white/80">{HOME.cta}</p>
              <ul className="relative m-0 mt-6 list-none space-y-3 p-0">
                {["Choose your membership category", "Pick your nearest chapter", "Our team will contact you on WhatsApp"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7b800] text-sm font-bold text-[#1a2a80]">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
              <div className="relative mt-8 flex flex-wrap gap-3">
                <Link href="/member-login" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/20 hover:bg-white/20">
                  <LogIn size={18} /> Member Log in
                </Link>
                <a href={wa("I would like to become an iEagles member")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-5 py-3 font-semibold">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-[#e2e7ef] bg-white p-8 shadow-xl md:p-10">
              <h2 className="mb-6 !text-3xl">Become a Member</h2>
              <EnquiryForm mode="membership" topics={["Membership Enquiry"]} submitLabel="Apply for Membership" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
