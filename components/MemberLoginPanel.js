"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [signedIn, setSignedIn] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => d.user?.role === "member" && setSignedIn(d.user))
      .catch(() => {});
  }, []);

  async function login(e) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, portal: "member", memberType: role }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Login failed.");
      router.push(d.redirect || "/members");
      router.refresh();
    } catch (err) {
      setMsg(err.message);
      setBusy(false);
    }
  }

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
            onSubmit={login}
          >
            {signedIn && (
              <p className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#ecfdf3] px-4 py-3 text-sm text-[#14532d]">
                Signed in as {signedIn.name}.
                <Link href="/members" className="font-semibold underline">Go to your dashboard →</Link>
              </p>
            )}
            <label className="relative block">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5b6675]" />
              <input className={input} type="email" placeholder="Email address" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="relative block">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5b6675]" />
              <input className={input} type={show ? "text" : "password"} placeholder="Password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5b6675]">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>

            <div className="flex items-center justify-end text-sm">
              <a className="font-semibold text-[#1a2a80] hover:underline" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("I forgot my member password")}`}>
                Forgot password?
              </a>
            </div>

            <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl border-0 bg-[#1a2a80] py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2c3fa8] disabled:opacity-60" type="submit">
              <LogIn size={18} /> {busy ? "Signing in…" : "Log in"}
            </button>
            {msg && <p role="alert" className="rounded-lg bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">{msg}</p>}
          </form>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#e2e7ef] pt-6 text-sm sm:flex-row sm:items-center">
            <span className="text-[#5b6675]">
              Not a member yet?
              <Link href="/admin/login" className="mt-1 block font-semibold text-[#1a2a80] hover:underline">Admin or Chapter Director? Sign in here →</Link>
            </span>
            <div className="flex flex-wrap gap-4">
              <Link className="inline-flex items-center gap-1 font-semibold text-[#1a2a80]" href="/membership#apply">
                <MessageCircle size={16} /> Apply for membership
              </Link>
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
