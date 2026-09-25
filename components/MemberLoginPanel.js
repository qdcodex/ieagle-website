"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Crown, Landmark, Users, Mail, Lock, Eye, EyeOff, ShieldCheck, CalendarCheck, Store, Newspaper, ArrowRight, MessageCircle, LogIn } from "lucide-react";
import { SITE } from "@/lib/data";

const ROLES = [
  { id: "executive", label: "Executive Members", short: "Executive", icon: Crown, note: "Office bearers and the executive committee." },
  { id: "governing", label: "Governing board", short: "Governing", icon: Landmark, note: "Board members and advisors." },
  { id: "chapter", label: "Chapter Members", short: "Chapter", icon: Users, note: "Members of your local chapter." },
];

const PERKS = [
  { icon: Store, t: "Manage your business listing" },
  { icon: CalendarCheck, t: "Register for events and meets" },
  { icon: Newspaper, t: "Access member newsletters" },
  { icon: ShieldCheck, t: "Secure, members-only area" },
];

const input =
  "w-full rounded-xl border border-[#e2e7ef] bg-[#f6f8fb] py-3.5 pl-11 pr-3 outline-none transition focus:border-[#1a2a80] focus:bg-white focus:ring-4 focus:ring-[#1a2a80]/10";

// Demo only: no authentication backend is wired up yet.
export default function MemberLoginPanel() {
  const [role, setRole] = useState("executive");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      if (ROLES.some((r) => r.id === h)) {
        setRole(h);
        setMsg("");
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const active = ROLES.find((r) => r.id === role);
  const Icon = active.icon;

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-16">
      {ROLES.map((r) => (
        <span key={r.id} id={r.id} className="absolute -top-24" />
      ))}

      <div className="grid overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid-cols-[1fr_1.1fr]">
        {/* Brand side */}
        <div className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex" style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80 55%,#2c3fa8)" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.4) 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }} />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#f7b800]/25 blur-3xl" />
          <div className="relative">
            <img src="/logo.png" alt="iEagles" className="mb-8 h-20 w-auto" />
            <h2 className="mb-3 !text-3xl !text-white" style={{ letterSpacing: "-0.03em" }}>Welcome back to the network</h2>
            <p className="mb-8 text-white/75">Sign in to manage your profile, connect with members and stay updated.</p>
            <ul className="m-0 list-none space-y-4 p-0">
              {PERKS.map(({ icon: I, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#f7b800]"><I size={20} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="relative mt-10 text-sm text-white/60">Trusted by business owners across states and districts.</p>
        </div>

        {/* Form side */}
        <div className="p-6 sm:p-10">
          <div role="tablist" aria-label="Member type" className="mb-8 grid grid-cols-3 gap-1 rounded-xl bg-[#f0f2f7] p-1">
            {ROLES.map((r) => {
              const I = r.icon;
              const on = r.id === role;
              return (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setRole(r.id);
                    setMsg("");
                    history.replaceState(null, "", `#${r.id}`);
                  }}
                  className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border-0 px-2 py-2.5 text-xs font-semibold transition sm:flex-row sm:justify-center sm:gap-2 sm:text-sm ${
                    on ? "bg-[#1a2a80] text-white shadow" : "bg-transparent text-[#5b6675] hover:text-[#1a2a80]"
                  }`}
                >
                  <I size={16} /> {r.short}
                </button>
              );
            })}
          </div>

          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7b800] text-[#1a2a80]"><Icon size={28} /></span>
            <div>
              <h2 className="!text-2xl" style={{ letterSpacing: "-0.02em" }}>{active.label} log in</h2>
              <p className="text-sm text-[#5b6675]">{active.note}</p>
            </div>
          </div>

          <form
            key={role}
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setMsg(`${active.label} login is not connected to a backend yet.`);
            }}
          >
            <label className="relative block">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5b6675]" />
              <input className={input} type="email" placeholder="Email address" required />
            </label>
            <label className="relative block">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5b6675]" />
              <input className={input} type={show ? "text" : "password"} placeholder="Password" required />
              <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5b6675]">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-[#5b6675]">
                <input type="checkbox" className="h-4 w-4 accent-[#1a2a80]" style={{ minWidth: 0 }} /> Remember me
              </label>
              <a className="font-semibold text-[#1a2a80] hover:underline" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("I forgot my member password")}`}>
                Forgot password?
              </a>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a2a80] py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2c3fa8]" type="submit">
              <LogIn size={18} /> Log in
            </button>
            {msg && <p className="rounded-lg bg-[#f7b800]/20 px-4 py-3 text-sm text-[#1a2a80]">{msg}</p>}
          </form>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#e2e7ef] pt-6 text-sm sm:flex-row sm:items-center">
            <span className="text-[#5b6675]">Not a member yet?</span>
            <div className="flex flex-wrap gap-4">
              <a className="inline-flex items-center gap-1 font-semibold text-[#1a2a80]" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("I would like to become a member")}`}>
                <MessageCircle size={16} /> Request membership
              </a>
              <Link className="inline-flex items-center gap-1 font-semibold text-[#1a2a80]" href="/business-directory">
                Browse directory <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
