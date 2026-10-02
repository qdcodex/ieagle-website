"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ShieldCheck, Mail, Lock, LogIn, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { api, ErrorNote } from "./ui";

const input =
  "w-full rounded-xl border border-white/15 bg-white/10 py-3.5 pl-11 pr-3 text-white outline-none placeholder:text-white/50 focus:border-[#f7b800] focus:ring-4 focus:ring-[#f7b800]/20";

function Form() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await api("/api/auth/login", { method: "POST", body: { email, password, portal: "admin" } });
      router.push(next?.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (e2) {
      setErr(e2.message);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="relative block">
        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
        <input className={input} type="email" placeholder="Email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="relative block">
        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
        <input className={`${input} pr-12`} type={show ? "text" : "password"} placeholder="Password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border-0 bg-transparent text-white/70 hover:bg-white/10 hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </label>
      <ErrorNote>{err}</ErrorNote>
      <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl border-0 bg-[#f7b800] py-3.5 font-semibold text-[#1a2a80] shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60">
        <LogIn size={18} /> {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLogin() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16" style={{ background: "linear-gradient(160deg,#0a1238 0%,#15226c 55%,#203088 100%)" }}>
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.4) 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }} />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#f7b800]/20 blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-4">
            <img src="/logo.png" alt="iEagles" className="h-14 w-auto" />
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#f7b800]">
                <ShieldCheck size={14} /> Admin · Chapter Director
              </p>
              <h1 className="!text-2xl !text-white">iEagles Staff Login</h1>
            </div>
          </div>
          <Suspense>
            <Form />
          </Suspense>
        </div>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft size={16} /> Back to website
        </Link>
      </div>
    </div>
  );
}
