import { Newspaper, Printer, Globe, Trophy, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import ContactForm from "@/components/ContactForm";
import { Section, SectionTitle, cardCls } from "@/components/ui";
import { SITE } from "@/lib/data";

export const metadata = { title: "Contact us — iEagle" };

const TOPICS = [
  { id: "newsletter", icon: Newspaper, title: "Newsletter", text: "Submit articles or subscribe to our newsletter." },
  { id: "offline-ad", icon: Printer, title: "Offline Advertisement", text: "Advertise in our printed publications and event material." },
  { id: "online-ad", icon: Globe, title: "Online Advertisement", text: "Promote your brand on our website and social channels." },
  { id: "sponsor", icon: Trophy, title: "Sponsor a Event", text: "Partner with us to sponsor an upcoming event." },
];

const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact us" title="Let’s talk" subtitle="Advertise, sponsor or just say hello — we reply on WhatsApp." />

      <Section>
        <SectionTitle eyebrow="How can we help?" title="Choose a topic" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map(({ id, icon: Icon, title, text }, i) => (
            <Reveal key={id} delay={i * 80}>
              <div id={id} className={`${cardCls} flex h-full scroll-mt-28 flex-col`}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold text-navy"><Icon size={26} /></div>
                <h3 className="mb-2 text-xl">{title}</h3>
                <p className="mb-5 text-[#5b6675]">{text}</p>
                <a className="mt-auto inline-flex items-center gap-2 font-semibold text-navy" target="_blank" rel="noopener noreferrer" href={wa(`Hello, I am interested in: ${title}`)}>
                  <MessageCircle size={18} /> Enquire
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="h-full rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }}>
              <h2 className="mb-3 !text-3xl !text-white">Reach us directly</h2>
              <p className="mb-8 text-white/80">Fastest reply is on WhatsApp. Tell us what you need and we will get back to you.</p>
              <a className="mb-4 flex items-center gap-4 rounded-xl bg-white/10 p-4 transition hover:bg-white/20" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${SITE.whatsapp}`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366]"><MessageCircle /></span>
                <span><span className="block text-sm text-white/70">WhatsApp</span><b className="text-lg">{SITE.whatsappDisplay}</b></span>
              </a>
              <div className="flex items-center gap-4 rounded-xl bg-white/10 p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy"><Phone /></span>
                <span><span className="block text-sm text-white/70">Call / message</span><b className="text-lg">{SITE.whatsappDisplay}</b></span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-8">
              <h2 className="mb-5 !text-3xl">Send a message</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
