"use client";
import { useState } from "react";
import { X, Copy, Check, Eye, EyeOff } from "lucide-react";

export const inputCls =
  "w-full rounded-xl border border-[#d6dbe8] bg-white px-3.5 py-2.5 text-[#1c2430] outline-none transition focus:border-[#1a2a80] focus:ring-4 focus:ring-[#1a2a80]/10";

export async function api(url, opts = {}) {
  const r = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || `Request failed (${r.status})`);
  return d;
}

export function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div
        className={`max-h-[92dvh] w-full overflow-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl ${wide ? "max-w-3xl" : "max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "feedIn .2s ease both" }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e2e7ef] bg-white px-6 py-4">
          <h3 className="text-lg">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full border-0 bg-[#f0f2f7] text-[#1a2a80] hover:bg-[#e2e7ef]">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-[#1a2a80]">{label}</span>
      {children}
    </label>
  );
}

export function Btn({ children, variant = "navy", className = "", ...p }) {
  const v = {
    navy: "bg-[#1a2a80] text-white hover:bg-[#2c3fa8]",
    gold: "bg-[#f7b800] text-[#1a2a80] hover:brightness-105",
    ghost: "bg-[#f0f2f7] text-[#1a2a80] hover:bg-[#e2e7ef]",
    danger: "bg-[#fef2f2] text-[#b91c1c] hover:bg-[#fee2e2]",
    green: "bg-[#25d366] text-white hover:brightness-105",
  }[variant];
  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-xl border-0 px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${v} ${className}`} {...p}>
      {children}
    </button>
  );
}

export function ErrorNote({ children }) {
  return children ? <p role="alert" className="rounded-xl bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">{children}</p> : null;
}

const STATUS_STYLE = {
  new: "bg-[#fff7df] text-[#8a5a00]",
  contacted: "bg-[#e8f0ff] text-[#1a3fa8]",
  approved: "bg-[#ecfdf3] text-[#14532d]",
  rejected: "bg-[#fef2f2] text-[#991b1b]",
  active: "bg-[#ecfdf3] text-[#14532d]",
  disabled: "bg-[#f0f2f7] text-[#5b6675]",
};
export function Badge({ status }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[status] ?? "bg-[#f0f2f7] text-[#5b6675]"}`}>{status}</span>;
}

export function CopyText({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-[#f0f2f7] px-3 py-1.5 text-xs font-semibold text-[#1a2a80] hover:bg-[#e2e7ef]"
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? "Copied" : "Copy"}
    </button>
  );
}

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");
export const fmtDateTime = (d) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

/** Password field with a show / hide button. */
export function PasswordInput({ className = "", ...props }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative block">
      <input {...props} type={show ? "text" : "password"} className={`${inputCls} pr-12 ${className}`} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border-0 bg-transparent text-[#5b6675] hover:bg-[#f0f2f7] hover:text-[#1a2a80]"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </span>
  );
}

/** Password change form used by admins and members. */
export function ChangePasswordForm({ onDone }) {
  const [f, setF] = useState({ current: "", next: "", confirm: "" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (f.next !== f.confirm) return setErr("New passwords do not match.");
    setBusy(true);
    try {
      await api("/api/account/password", { method: "POST", body: { current: f.current, next: f.next } });
      setOk(true);
      setF({ current: "", next: "", confirm: "" });
      onDone?.();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Current password">
        <PasswordInput autoComplete="current-password" required value={f.current} onChange={set("current")} />
      </Field>
      <Field label="New password (8+ characters, letters and numbers)">
        <PasswordInput autoComplete="new-password" required minLength={8} value={f.next} onChange={set("next")} />
      </Field>
      <Field label="Confirm new password">
        <PasswordInput autoComplete="new-password" required value={f.confirm} onChange={set("confirm")} />
      </Field>
      <ErrorNote>{err}</ErrorNote>
      {ok && <p className="rounded-xl bg-[#ecfdf3] px-4 py-3 text-sm text-[#14532d]">Password updated.</p>}
      <Btn disabled={busy} type="submit">{busy ? "Saving…" : "Update password"}</Btn>
    </form>
  );
}
