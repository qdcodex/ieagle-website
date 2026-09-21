"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { SITE } from "@/lib/data";

const input =
  "w-full rounded-lg border border-[#e2e7ef] bg-white px-4 py-3 outline-none transition focus:border-[#1a2a80] focus:ring-2 focus:ring-[#1a2a80]/15";

const TOPICS = ["Newsletter", "Offline Advertisement", "Online Advertisement", "Sponsor a Event", "General enquiry"];

// No email backend: the form opens WhatsApp with the message pre-filled.
export default function ContactForm() {
  const [f, setF] = useState({ name: "", topic: TOPICS[4], message: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const text = `Hello, I'm ${f.name}.\nTopic: ${f.topic}\n${f.message}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <input className={input} placeholder="Your name" required value={f.name} onChange={set("name")} />
      <select className={input} value={f.topic} onChange={set("topic")}>
        {TOPICS.map((t) => <option key={t}>{t}</option>)}
      </select>
      <textarea className={input} rows={4} placeholder="Your message" required value={f.message} onChange={set("message")} />
      <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a2a80] py-3 font-semibold text-white transition hover:bg-[#2c3fa8]">
        <Send size={18} /> Send via WhatsApp
      </button>
    </form>
  );
}
