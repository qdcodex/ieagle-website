"use client";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/data";

// Simple rule-based assistant (no external AI service). Each rule: keywords -> reply.
const RULES = [
  { k: ["hello", "hi", "hey"], a: "Hello! 👋 I can help with events, membership, directory, newsletters, advertising and the business directory." },
  { k: ["vision", "mission", "origin", "about", "hierarchy"], a: "You can read about our vision, mission, origin and hierarchy on the About us page: /about", link: "/about" },
  { k: ["event", "upcoming", "past"], a: "See past and upcoming events on the Events page: /events", link: "/events" },
  { k: ["login", "log in", "member", "executive", "governing", "chapter"], a: "Members can log in from the Member Log in page (Executive Members, Governing board, Chapter Members): /member-login", link: "/member-login" },
  { k: ["directory", "state", "district"], a: "Find chapters by state and district in the Directory: /directory", link: "/directory" },
  { k: ["business", "company", "category"], a: "Search member businesses by state, district, area, category or company: /business-directory", link: "/business-directory" },
  { k: ["newsletter"], a: "Our newsletters are available at /newsletter (Sep–Oct 2026, Nov–Dec 2026).", link: "/newsletter" },
  { k: ["advert", "ad ", "sponsor"], a: "For offline/online advertisement or sponsoring an event, see /contact or message us on WhatsApp.", link: "/contact" },
  { k: ["contact", "phone", "whatsapp", "number", "call"], a: `Reach us on WhatsApp: ${SITE.whatsappDisplay}.`, wa: true },
];
const FALLBACK = { a: `I'm not sure about that. Please chat with our team on WhatsApp: ${SITE.whatsappDisplay}.`, wa: true };
const QUICK = ["Upcoming events", "Member login", "Business directory", "Advertise with us"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hi! I'm the iEagle assistant. How can I help you today?" }]);
  const end = useRef(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function send(text) {
    const t = text.trim();
    if (!t) return;
    const q = ` ${t.toLowerCase()} `;
    const rule = RULES.find((r) => r.k.some((w) => q.includes(w))) || FALLBACK;
    setMsgs((m) => [...m, { from: "user", text: t }, { from: "bot", text: rule.a, link: rule.link, wa: rule.wa }]);
    setInput("");
  }

  return (
    <>
      {open && (
        <div className="chat" role="dialog" aria-label="Chat assistant">
          <div className="chat-head">
            <b>iEagle Assistant</b>
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
