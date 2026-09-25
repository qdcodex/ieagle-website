import {
  UserPlus, MapPinned, Handshake, CalendarDays, Mic, Newspaper, Printer, Globe, Trophy, MessageCircle, Phone, Mail, MapPin, ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { SocialLinks } from "@/components/SocialFloat";
import { Section, Heading } from "@/components/blocks";
import { CONTACT, BRAND } from "@/lib/content";
import { SITE, wa } from "@/lib/data";

export const metadata = { title: "Contact us — iEagles Business Network" };

const ENQUIRY_ICONS = [UserPlus, MapPinned, Handshake, CalendarDays, Mic];
const AD_ICONS = [Newspaper, Printer, Globe, Trophy];
const ALL_TOPICS = [...CONTACT.enquiries.map((e) => e.t), ...CONTACT.advertise.map((e) => e.t), "General enquiry"];

function TopicCard({ id, icon: Icon, title, text, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div id={id} className="group flex h-full scroll-mt-32 flex-col rounded-2xl border border-[#e2e7ef] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7b800] text-[#1a2a80] transition group-hover:scale-110"><Icon size={24} /></div>
        <h3 className="mb-2 text-lg">{title}</h3>
        {text && <p className="mb-4 text-sm text-[#5b6675]">{text}</p>}
        <a className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1a2a80] transition-all group-hover:gap-3" target="_blank" rel="noopener noreferrer" href={wa(`Hello iEagles, I have a ${title}`)}>
          <MessageCircle size={16} /> Enquire <ArrowRight size={14} />
        </a>
      </div>
    </Reveal>
  );
}

export default function Contact() {
  const details = [
    { icon: MapPin, label: "Address", value: CONTACT.address },
    { icon: Phone, label: "Helpline", value: SITE.whatsappDisplay, href: `tel:+${SITE.whatsapp}` },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Globe, label: "Website", value: CONTACT.website, href: `https://${CONTACT.website}` },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={CONTACT.title}
        crumb="Contact us"
        subtitle={CONTACT.intro.join(" ")}
        links={[
          { label: "Enquiries", href: "#enquiries" },
          { label: "Advertise & Sponsor", href: "#advertise" },
          { label: "Send a message", href: "#message" },
        ]}
      />

      {/* Contact details */}
      <Section className="!pb-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 70}>
              <div className="flex h-full flex-col items-start gap-4 rounded-2xl p-6 text-white shadow-xl" style={{ background: i % 2 ? "linear-gradient(135deg,#2c3fa8,#1a2a80)" : "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f7b800] text-[#1a2a80]"><Icon size={22} /></span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{label}</span>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block break-words text-[15px] font-semibold hover:text-[#f7b800]">{value}</a>
                  ) : (
                    <span className="block text-[15px] font-semibold">{value}</span>
                  )}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Enquiries */}
      <Section id="enquiries" className="!pt-10">
        <Heading eyebrow="Enquiry" title="How can we help?" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CONTACT.enquiries.map((e, i) => (
            <TopicCard key={e.id} id={e.id} icon={ENQUIRY_ICONS[i]} title={e.t} delay={i * 60} />
          ))}
        </div>
      </Section>

      {/* Advertise */}
      <Section id="advertise" tone="white">
        <Heading eyebrow="Advertise & Sponsor" title="Grow your brand with iEagles" intro="Advertise in the iEagles Brand Your Business Magazine, online or at our events." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT.advertise.map((e, i) => (
            <TopicCard key={e.id} id={e.id} icon={AD_ICONS[i]} title={e.t} text={e.d} delay={i * 60} />
          ))}
        </div>
      </Section>

      {/* Message + follow */}
      <Section id="message">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl p-8 text-white md:p-10" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 55%,#2c3fa8)" }}>
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#f7b800]/25 blur-3xl" />
              <img src="/logo.png" alt="" className="relative mb-5 h-20 w-auto" />
              <h2 className="relative !text-3xl !text-white">{BRAND.name}</h2>
              <p className="relative mt-1 text-[#f7b800]">{BRAND.pillars.join(" • ")}</p>
              <p className="relative mt-5 text-white/80">Fastest reply is on WhatsApp. Tell us what you need and we will get back to you.</p>
              <a className="relative mt-6 flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-white/20" target="_blank" rel="noopener noreferrer" href={wa()}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366]"><MessageCircle /></span>
                <span><span className="block text-sm text-white/70">Helpline / WhatsApp</span><b className="text-lg">{SITE.whatsappDisplay}</b></span>
              </a>
              <div className="relative mt-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{CONTACT.followTitle}</p>
                <SocialLinks dark size={44} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-[#e2e7ef] bg-white p-8 shadow-xl md:p-10">
              <h2 className="mb-6 !text-3xl">Send a message</h2>
              <EnquiryForm topics={ALL_TOPICS} defaultTopic="General enquiry" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
