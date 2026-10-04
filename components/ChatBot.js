"use client";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";

// Simple rule-based assistant (no external AI service). Each rule: keywords -> reply.
const RULES = [
  { k: ["hello", "hi", "hey", "vanakkam"], a: "Hello! 👋 Welcome to iEagles Business Network — Where Business Meets Purpose. Ask me about membership, chapters, programs, events, the magazine or the business directory." },
  { k: ["login", "log in", "sign in", "executive", "governing"], a: "All members sign in from the Member Log in page with their email and password.", link: "/member-login" },
  { k: ["member", "join", "category", "categories", "elite", "gold", "platinum", "diamond", "millionaire", "benefit"], a: "Become an iEagle! Membership categories: Elite, Gold, Platinum, Diamond, Millionaire and Partner. See who can join and what members get.", link: "/membership" },
  { k: ["chapter", "karungal", "nagercoil", "thuckalay", "marthandam", "colachel", "monday market", "state", "district", "kanyakumari"], a: "Our Kanyakumari District chapters: Karungal, Nagercoil, Thuckalay, Marthandam, Colachel and Monday Market. Find a chapter or start one.", link: "/chapters" },
  { k: ["academy", "course", "learn", "training", "leadership"], a: "The iEagles Academy offers programs from entrepreneurship to AI & technology, plus Learning & Leadership training.", link: "/academy" },
  { k: ["program", "networking", "business development"], a: "Explore Networking and Business Development, along with our events and awards.", link: "/programs" },
  { k: ["award", "recognition"], a: "See our Recognition & Awards categories — Entrepreneur of the Month, Business Excellence and more.", link: "/awards" },
  { k: ["event", "meeting", "conclave", "upcoming", "past"], a: "See upcoming and past iEagles events and the types of events we host.", link: "/events" },
  { k: ["business", "company", "directory", "listing"], a: "Search member businesses by state, district, chapter, area, category or company in the Business Directory.", link: "/business-directory" },
  { k: ["magazine", "newsletter", "story", "brand your business"], a: "Read the iEagles Brand Your Business Magazine (Sep–Oct 2026, Nov–Dec 2026) or submit your story.", link: "/magazine" },
  { k: ["advert", "ads", "sponsor", "media"], a: "For offline/online advertisement, sponsoring an event or media enquiries, see our Contact page.", link: "/contact#advertise" },
  { k: ["partner"], a: "We partner with corporates, institutions, startups, associations, media and sponsors.", link: "/partnerships" },
  { k: ["donate", "donation", "charity", "foundation", "social"], a: "Support the iEagles Rehabilitation Foundation — all donations are tax exempted.", link: "/social-responsibility" },
  { k: ["vision", "mission", "value", "objective", "origin", "about", "hierarchy", "who"], a: "Read about who we are, our vision, mission, core values, objectives and hierarchy.", link: "/about" },
  { k: ["contact", "phone", "whatsapp", "number", "call", "email", "address"], a: `Helpline: ${SITE.whatsappDisplay} · Email: ${SITE.email} · ${SITE.address}.`, wa: true },
];
const FALLBACK = { a: `I'm not sure about that. Please chat with our team on WhatsApp: ${SITE.whatsappDisplay}.`, wa: true };
const QUICK = ["Membership", "Find a chapter", "Upcoming events", "Business directory", "Donate"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hi! I'm the iEagles assistant. How can I help you today?" }]);
  const end = useRef(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function send(text) {
    const t = text.trim();
    if (!t) return;
    // Keywords must start a word, so "hi" does not match inside "membership"
    const q = ` ${t.toLowerCase().replace(/[^a-z0-9]+/g, " ")} `;
    const rule = RULES.find((r) => r.k.some((w) => q.includes(` ${w}`))) || FALLBACK;
    setMsgs((m) => [...m, { from: "user", text: t }, { from: "bot", text: rule.a, link: rule.link, wa: rule.wa }]);
    setInput("");
  }

  return (
    <>
      {open && (
        <div className="chat" role="dialog" aria-label="Chat assistant">
          <div className="chat-head">
            <b>iEagles Assistant</b>
            <button onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="chat-body">
            {msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.text}
                {m.link && (
                  <a href={m.link} className="chat-link">Open page →</a>
                )}
                {m.wa && (
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="chat-link">
                    Chat on WhatsApp →
                  </a>
                )}
              </div>
            ))}
            <div ref={end} />
          </div>
          <div className="chat-quick">
            {QUICK.map((q) => (
              <button key={q} onClick={() => send(q)}>{q}</button>
            ))}
          </div>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" />
            <button type="submit" className="btn">Send</button>
          </form>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="Open chat">
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}
