"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut, KeyRound, ExternalLink, FileText, Users, ShieldCheck, UserPlus, Search, RefreshCw, CheckCircle2, MessageCircle, Inbox,
} from "lucide-react";
import { api, Modal, Field, Btn, ErrorNote, Badge, CopyText, inputCls, fmtDate, fmtDateTime, ChangePasswordForm } from "./ui";
import { MEMBERSHIP } from "@/lib/content";
import { CHAPTERS } from "@/lib/data";

const MEMBER_TYPES = { executive: "Executive Members", governing: "Governing board", chapter: "Chapter Members" };
const APP_STATUSES = ["new", "contacted", "approved", "rejected"];
const LOGIN_URL = typeof window !== "undefined" ? `${window.location.origin}/member-login` : "/member-login";

/** WhatsApp link to send a new member their login details. */
function credentialsLink(user, password) {
  const phone = String(user.phone || "").replace(/\D/g, "").replace(/^(\d{10})$/, "91$1");
  const text = [
    `Welcome to iEagles Business Network, ${user.name}!`,
    `Your member login is ready (${user.memberTypeLabel ?? "Member"}).`,
    `Login: ${LOGIN_URL}`,
    `Email: ${user.email}`,
    `Temporary password: ${password}`,
    "Please change your password after signing in.",
  ].join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function TempPasswordModal({ data, onClose }) {
  return (
    <Modal title="Account ready" onClose={onClose}>
      <div className="grid gap-4">
        <p className="flex items-center gap-2 text-[#14532d]">
          <CheckCircle2 size={20} /> {data.user.name} can now sign in.
        </p>
        <div className="rounded-2xl border border-[#e2e7ef] bg-[#f6f8fb] p-4 text-sm">
          <p className="text-[#5b6675]">Email</p>
          <p className="mb-3 font-semibold text-[#1a2a80]">{data.user.email}</p>
          <p className="text-[#5b6675]">Temporary password — shown only once</p>
          <div className="flex items-center justify-between gap-3">
            <code className="text-lg font-bold tracking-wider text-[#1a2a80]">{data.tempPassword}</code>
            <CopyText text={data.tempPassword} />
          </div>
        </div>
        <p className="text-sm text-[#5b6675]">They will be asked to change it after signing in.</p>
        <div className="flex flex-wrap gap-2">
          {data.user.phone && (
            <a href={credentialsLink(data.user, data.tempPassword)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-2.5 text-sm font-semibold text-white">
              <MessageCircle size={16} /> Send login on WhatsApp
            </a>
          )}
          <Btn variant="ghost" onClick={onClose}>Done</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- Applications ---------------- */

function ApplicationDetail({ app, onClose, onChanged, onCreated }) {
  const [status, setStatus] = useState(app.status);
  const [note, setNote] = useState(app.note ?? "");
  const [memberType, setMemberType] = useState("chapter");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(extra = {}) {
    setBusy(true);
    setErr("");
    try {
      const d = await api(`/api/admin/applications/${app.id}`, { method: "PATCH", body: { status, note, ...extra } });
      onChanged(d.application);
      if (d.tempPassword) onCreated({ user: d.user, tempPassword: d.tempPassword });
      else onClose();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  const rows = [
    ["Name", app.name],
    ["Category", app.category],
    ["Company Name", app.company],
    ["Designation", app.designation],
    ["GST", app.gst],
    ["Address", app.address],
    ["District with Pin", app.district],
    ["Contact", app.contact],
    ["E-Mail Id", app.email],
    ["Products/Services", app.products],
    ["Targeted Audiences", app.audience],
  ];

  return (
    <Modal title={`Application ${app.applicationNo}`} onClose={onClose} wide>
      <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-[#5b6675]">
        <Badge status={app.status} /> Received {fmtDateTime(app.createdAt)}
      </div>
      <dl className="grid gap-2 sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className={`rounded-xl bg-[#f6f8fb] p-3 ${k.includes("/") || k === "Address" || k.includes("Audiences") ? "sm:col-span-2" : ""}`}>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#5b6675]">{k}</dt>
            <dd className="mt-0.5 whitespace-pre-wrap break-words font-medium text-[#1c2430]">{v || "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={`https://wa.me/${String(app.contact).replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-2 text-sm font-semibold text-white">
          <MessageCircle size={16} /> WhatsApp applicant
        </a>
        <a href={`mailto:${app.email}`} className="inline-flex items-center gap-2 rounded-xl bg-[#f0f2f7] px-4 py-2 text-sm font-semibold text-[#1a2a80]">Email applicant</a>
      </div>

      <div className="mt-6 grid gap-4 border-t border-[#e2e7ef] pt-6 sm:grid-cols-2">
        <Field label="Status">
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)} disabled={app.status === "approved"}>
            {APP_STATUSES.map((s) => (
              <option key={s} value={s} disabled={s === "approved" && app.status !== "approved"}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Internal note">
          <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Visible to admins only" />
        </Field>
      </div>
      <ErrorNote>{err}</ErrorNote>
      <div className="mt-4 flex flex-wrap gap-2">
        <Btn disabled={busy} onClick={() => save()}>Save</Btn>
      </div>

      {app.status !== "approved" && (
        <div className="mt-6 rounded-2xl border border-[#f7b800]/50 bg-[#fffbeb] p-4">
          <p className="mb-3 font-semibold text-[#1a2a80]">Approve and create a member login</p>
          <div className="flex flex-wrap items-end gap-3">
            <Field label="Member type">
              <select className={inputCls} value={memberType} onChange={(e) => setMemberType(e.target.value)}>
                {Object.entries(MEMBER_TYPES).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </Field>
            <Btn variant="gold" disabled={busy} onClick={() => save({ approve: { memberType } })}>
              <UserPlus size={16} /> Approve & create login
            </Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}

function Applications({ onCreated, refreshStats }) {
  const [list, setList] = useState(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(null);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setErr("");
    try {
      const p = new URLSearchParams();
      if (q) p.set("q", q);
      if (status) p.set("status", status);
      setList((await api(`/api/admin/applications?${p}`)).applications);
    } catch (e) {
      setErr(e.message);
    }
  }, [q, status]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="relative min-w-[220px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b6675]" />
          <input className={`${inputCls} pl-9`} placeholder="Search name, company, email, application no." value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select className={`${inputCls} !w-auto`} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option>
          {APP_STATUSES.map((s) => (
            <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <Btn variant="ghost" onClick={load} aria-label="Refresh"><RefreshCw size={16} /></Btn>
      </div>
      <ErrorNote>{err}</ErrorNote>
      {!list ? (
        <p className="py-10 text-center text-[#5b6675]">Loading…</p>
      ) : !list.length ? (
        <div className="rounded-2xl border border-dashed border-[#d6dbe8] py-14 text-center text-[#5b6675]">
          <Inbox className="mx-auto mb-2" /> No applications yet. They appear here when someone submits the membership form.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#e2e7ef] bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#f6f8fb] text-xs uppercase tracking-wider text-[#5b6675]">
              <tr>
                {["Application No.", "Date", "Name", "Company", "Category", "Contact", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id} onClick={() => setOpen(a)} className="cursor-pointer border-t border-[#eef1f6] hover:bg-[#f6f8fb]">
                  <td className="px-4 py-3 font-mono font-semibold text-[#1a2a80]">{a.applicationNo}</td>
                  <td className="px-4 py-3">{fmtDate(a.createdAt)}</td>
                  <td className="px-4 py-3 font-medium">{a.name}</td>
                  <td className="px-4 py-3">{a.company}</td>
                  <td className="px-4 py-3">{a.category}</td>
                  <td className="px-4 py-3">{a.contact}</td>
                  <td className="px-4 py-3"><Badge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {open && (
        <ApplicationDetail
          app={open}
          onClose={() => setOpen(null)}
          onChanged={(a) => {
            setList((l) => l.map((x) => (x.id === a.id ? a : x)));
            refreshStats();
          }}
          onCreated={(d) => {
            setOpen(null);
            onCreated(d);
          }}
        />
      )}
    </div>
  );
}

/* ---------------- Members / admins ---------------- */

function NewUserModal({ role, onClose, onCreated }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", company: "", memberType: "chapter", category: "", chapter: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      onCreated(await api("/api/admin/members", { method: "POST", body: { ...f, role } }));
    } catch (e2) {
      setErr(e2.message);
      setBusy(false);
    }
  }

  return (
    <Modal title={role === "admin" ? "Add admin" : "Add member"} onClose={onClose}>
      <form onSubmit={submit} className="grid gap-4">
        <Field label="Full name"><input className={inputCls} required value={f.name} onChange={set("name")} /></Field>
        <Field label="Email (used to sign in)"><input className={inputCls} type="email" required value={f.email} onChange={set("email")} /></Field>
        <Field label="Mobile (for sending login on WhatsApp)"><input className={inputCls} type="tel" value={f.phone} onChange={set("phone")} /></Field>
        {role === "member" && (
          <>
            <Field label="Member type">
              <select className={inputCls} value={f.memberType} onChange={set("memberType")}>
                {Object.entries(MEMBER_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company"><input className={inputCls} value={f.company} onChange={set("company")} /></Field>
              <Field label="Membership category">
                <select className={inputCls} value={f.category} onChange={set("category")}>
                  <option value="">—</option>
                  {MEMBERSHIP.categories.map((c) => <option key={c.t}>{c.t}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Chapter">
              <select className={inputCls} value={f.chapter} onChange={set("chapter")}>
                <option value="">—</option>
                {CHAPTERS.map((c) => <option key={c.slug}>{c.name}</option>)}
              </select>
            </Field>
          </>
        )}
        <p className="text-sm text-[#5b6675]">A temporary password is generated and shown once after saving.</p>
        <ErrorNote>{err}</ErrorNote>
        <Btn disabled={busy} type="submit"><UserPlus size={16} /> {busy ? "Creating…" : "Create account"}</Btn>
      </form>
    </Modal>
  );
}

function People({ role, meId, onCreated, refreshStats }) {
  const [list, setList] = useState(null);
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setErr("");
    try {
      setList((await api(`/api/admin/members?role=${role}&q=${encodeURIComponent(q)}`)).users);
    } catch (e) {
      setErr(e.message);
    }
  }, [q, role]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  async function patch(u, body) {
    setErr("");
    try {
      const d = await api(`/api/admin/members/${u.id}`, { method: "PATCH", body });
      setList((l) => l.map((x) => (x.id === u.id ? d.user : x)));
      if (d.tempPassword) onCreated({ user: d.user, tempPassword: d.tempPassword });
      refreshStats();
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="relative min-w-[220px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b6675]" />
          <input className={`${inputCls} pl-9`} placeholder="Search name, email, company, chapter" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <Btn variant="gold" onClick={() => setAdding(true)}><UserPlus size={16} /> {role === "admin" ? "Add admin" : "Add member"}</Btn>
      </div>
      <ErrorNote>{err}</ErrorNote>
      {!list ? (
        <p className="py-10 text-center text-[#5b6675]">Loading…</p>
      ) : !list.length ? (
        <div className="rounded-2xl border border-dashed border-[#d6dbe8] py-14 text-center text-[#5b6675]">
          <Users className="mx-auto mb-2" /> No {role === "admin" ? "admins" : "members"} found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#e2e7ef] bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-[#f6f8fb] text-xs uppercase tracking-wider text-[#5b6675]">
              <tr>
                {["Name", "Email", role === "member" ? "Member type" : "Role", "Company", "Status", "Last login", ""].map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id} className="border-t border-[#eef1f6]">
                  <td className="px-4 py-3 font-medium">{u.name}{u.id === meId && <span className="ml-2 text-xs text-[#5b6675]">(you)</span>}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    {role === "member" ? (
                      <select className="rounded-lg border border-[#d6dbe8] bg-white px-2 py-1 text-sm" value={u.memberType ?? ""} onChange={(e) => patch(u, { memberType: e.target.value })} aria-label="Member type">
                        {Object.entries(MEMBER_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    ) : (
                      "Admin"
                    )}
                  </td>
                  <td className="px-4 py-3">{u.company || "—"}</td>
                  <td className="px-4 py-3"><Badge status={u.status} /></td>
                  <td className="px-4 py-3 text-[#5b6675]">{fmtDateTime(u.lastLoginAt)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button onClick={() => patch(u, { resetPassword: true })} className="mr-1 inline-flex items-center gap-1 rounded-lg border-0 bg-[#f0f2f7] px-2.5 py-1.5 text-xs font-semibold text-[#1a2a80] hover:bg-[#e2e7ef]">
                      <KeyRound size={13} /> Reset password
                    </button>
                    {u.id !== meId && (
                      <button
                        onClick={() => patch(u, { status: u.status === "active" ? "disabled" : "active" })}
                        className={`inline-flex rounded-lg border-0 px-2.5 py-1.5 text-xs font-semibold ${u.status === "active" ? "bg-[#fef2f2] text-[#b91c1c]" : "bg-[#ecfdf3] text-[#14532d]"}`}
                      >
                        {u.status === "active" ? "Disable" : "Enable"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {adding && (
        <NewUserModal
          role={role}
          onClose={() => setAdding(false)}
          onCreated={(d) => {
            setAdding(false);
            setList((l) => [d.user, ...(l ?? [])]);
            refreshStats();
            onCreated(d);
          }}
        />
      )}
    </div>
  );
}

/* ---------------- Shell ---------------- */

export default function AdminDashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [stats, setStats] = useState(null);
  const [tab, setTab] = useState("applications");
  const [created, setCreated] = useState(null);
  const [pwOpen, setPwOpen] = useState(false);

  const refreshStats = useCallback(() => {
    api("/api/admin/stats").then(setStats).catch(() => {});
  }, []);

  useEffect(() => {
    api("/api/auth/me")
      .then((d) => {
        if (d.user?.role !== "admin") router.replace("/admin/login");
        else setMe(d.user);
      })
      .catch(() => router.replace("/admin/login"));
    refreshStats();
  }, [router, refreshStats]);

  async function logout() {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  }

  if (!me) return <div className="flex min-h-screen items-center justify-center bg-[#f4f6fb] text-[#5b6675]">Loading admin…</div>;

  const TABS = [
    { id: "applications", label: "Applications", icon: FileText, count: stats?.newApplications, countLabel: "new" },
    { id: "members", label: "Members", icon: Users, count: stats?.members },
    { id: "admins", label: "Admins", icon: ShieldCheck, count: stats?.admins },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <header className="sticky top-0 z-40 text-white shadow-lg" style={{ background: "linear-gradient(120deg,#0a1238,#1a2a80)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="iEagles" className="h-10 w-auto" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f7b800]">Admin</p>
              <p className="text-sm font-semibold">iEagles Business Network</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-white/80 md:inline">{me.name}</span>
            <Link href="/" target="_blank" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm hover:bg-white/10 sm:inline-flex"><ExternalLink size={15} /> Site</Link>
            <button onClick={() => setPwOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-transparent px-3 py-2 text-sm text-white hover:bg-white/10"><KeyRound size={15} /> <span className="hidden sm:inline">Password</span></button>
            <button onClick={logout} className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"><LogOut size={15} /> Log out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {me.mustChangePassword && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fffbeb] px-5 py-4 text-[#8a5a00] ring-1 ring-[#f7b800]/40">
            You are using a temporary password. Please set your own.
            <Btn variant="gold" onClick={() => setPwOpen(true)}>Change password</Btn>
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ["New applications", stats?.newApplications],
            ["All applications", stats?.applications],
            ["Active members", stats?.activeMembers],
            ["Admins", stats?.admins],
          ].map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e2e7ef]">
              <p className="text-3xl font-semibold text-[#1a2a80]">{v ?? "–"}</p>
              <p className="text-sm text-[#5b6675]">{l}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 flex gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-[#e2e7ef]" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-0 px-4 py-2.5 text-sm font-semibold transition ${tab === t.id ? "bg-[#1a2a80] text-white" : "bg-transparent text-[#5b6675] hover:text-[#1a2a80]"}`}
            >
              <t.icon size={16} /> {t.label}
              {t.count ? <span className={`rounded-full px-2 text-xs ${tab === t.id ? "bg-[#f7b800] text-[#1a2a80]" : "bg-[#f0f2f7]"}`}>{t.count}{t.countLabel ? ` ${t.countLabel}` : ""}</span> : null}
            </button>
          ))}
        </div>

        {tab === "applications" && <Applications onCreated={setCreated} refreshStats={refreshStats} />}
        {tab === "members" && <People role="member" meId={me.id} onCreated={setCreated} refreshStats={refreshStats} />}
        {tab === "admins" && <People role="admin" meId={me.id} onCreated={setCreated} refreshStats={refreshStats} />}
      </main>

      {created && <TempPasswordModal data={created} onClose={() => setCreated(null)} />}
      {pwOpen && (
        <Modal title="Change your password" onClose={() => setPwOpen(false)}>
          <ChangePasswordForm onDone={() => setMe({ ...me, mustChangePassword: false })} />
        </Modal>
      )}
    </div>
  );
}
