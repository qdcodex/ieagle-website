"use client";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { SITE, CHAPTERS } from "@/lib/data";
import { MEMBERSHIP } from "@/lib/content";

const input =
  "w-full rounded-xl border border-[#e2e7ef] bg-white px-4 py-3 outline-none transition focus:border-[#1a2a80] focus:ring-4 focus:ring-[#1a2a80]/10";

/**
 * Enquiry form. There is no email backend, so submitting opens WhatsApp with
 * the message pre-filled. mode: "contact" | "membership" | "chapter".
 */
export default function EnquiryForm({ topics = [], defaultTopic, mode = "contact", submitLabel = "Send via WhatsApp" }) {
  const [f, setF] = useState({ name: "", business: "", topic: defaultTopic ?? topics[0] ?? "", chapter: "", category: "", message: "" });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  // Pick up ?topic= or the #anchor so enquiry links preselect the right topic
  useEffect(() => {
    if (!topics.length) return;
    const q = new URLSearchParams(window.location.search).get("topic");
    const hit = topics.find((t) => t === q);
    if (hit) setF((p) => ({ ...p, topic: hit }));
  }, [topics]);

  function submit(e) {
    e.preventDefault();
    const lines = [
      `Hello iEagles, I'm ${f.name}${f.business ? ` from ${f.business}` : ""}.`,
      f.topic && `Topic: ${f.topic}`,
      f.category && `Membership category: ${f.category}`,
      f.chapter && `Chapter: ${f.chapter}`,
      f.message,
    ].filter(Boolean);
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={input} placeholder="Your name" required value={f.name} onChange={set("name")} />
        <input className={input} placeholder="Business / company" value={f.business} onChange={set("business")} />
      </div>
      {topics.length > 0 && (
        <select className={input} value={f.topic} onChange={set("topic")} aria-label="Topic">
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      )}
      {(mode === "membership" || mode === "chapter") && (
        <div className={`grid gap-4 ${mode === "membership" ? "sm:grid-cols-2" : ""}`}>
          {mode === "membership" && (
            <select className={input} value={f.category} onChange={set("category")} aria-label="Membership category">
              <option value="">Membership category</option>
              {MEMBERSHIP.categories.map((c) => (
                <option key={c.t}>{c.t}</option>
              ))}
            </select>
          )}
          <select className={input} value={f.chapter} onChange={set("chapter")} aria-label="Chapter">
            <option value="">Preferred chapter</option>
            {CHAPTERS.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      )}
      <textarea className={input} rows={4} placeholder="Your message" value={f.message} onChange={set("message")} />
      <button className="inline-flex items-center justify-center gap-2 rounded-xl border-0 bg-[#1a2a80] py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2c3fa8]">
        <Send size={18} /> {submitLabel}
      </button>
    </form>
  );
}
