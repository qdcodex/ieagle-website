"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, KeyRound, Store, CalendarDays, MapPinned, BookOpen, UserRound, Building2, Mail, Phone, BadgeCheck, Hash, ArrowRight } from "lucide-react";
import { api, Modal, ChangePasswordForm, fmtDate } from "@/components/admin/ui";
import MemberChapter from "@/components/MemberChapter";

const LINKS = [
  { href: "/business-directory", icon: Store, t: "Business Directory", d: "Find and connect with member businesses" },
  { href: "/events", icon: CalendarDays, t: "Events", d: "Upcoming meetings, sessions and conclaves" },
  { href: "/chapters", icon: MapPinned, t: "Chapters", d: "Your chapter and the wider network" },
  { href: "/magazine", icon: BookOpen, t: "Magazine", d: "Brand Your Business — latest issues" },
];

export default function MemberDashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [pwOpen, setPwOpen] = useState(false);

  useEffect(() => {
    api("/api/auth/me")
      .then((d) => (d.user?.role === "member" ? setMe(d.user) : router.replace("/member-login")))
      .catch(() => router.replace("/member-login"));
  }, [router]);

  async function logout() {
    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/member-login");
    router.refresh();
  }

  if (!me) return <div className="py-32 text-center text-[#5b6675]">Loading your dashboard…</div>;

  const profile = [
    [UserRound, "Name", me.name],
    [Mail, "Email", me.email],
    [Phone, "Contact", me.phone],
    [Building2, "Company", me.company],
    [BadgeCheck, "Membership category", me.category],
    [MapPinned, "Chapter", me.chapter],
    [BadgeCheck, "Business category", me.businessCategory],
    [Hash, "Application No.", me.applicationNo],
  ];

  return (
    <>
      <div className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#0f1a55 0%,#1a2a80 45%,#2c3fa8 100%)" }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.35) 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 py-14">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f7b800]">{me.memberTypeLabel ?? "Member"}</p>
            <h1 className="!text-4xl !text-white md:!text-5xl" style={{ letterSpacing: "-0.03em" }}>Welcome, {me.name.split(" ")[0]}</h1>
            <p className="mt-2 text-white/75">Member since {fmtDate(me.createdAt)}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setPwOpen(true)} className="inline-flex items-center gap-2 rounded-xl border-0 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20">
              <KeyRound size={16} /> Change password
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border-0 bg-[#f7b800] px-4 py-2.5 text-sm font-semibold text-[#1a2a80]">
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {me.mustChangePassword && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fffbeb] px-5 py-4 text-[#8a5a00] ring-1 ring-[#f7b800]/40">
            You signed in with a temporary password. Please set your own password now.
            <button onClick={() => setPwOpen(true)} className="rounded-xl border-0 bg-[#f7b800] px-4 py-2 text-sm font-semibold text-[#1a2a80]">Change password</button>
          </div>
        )}

        <MemberChapter />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <section className="rounded-3xl border border-[#e2e7ef] bg-white p-6 shadow-sm">
            <h2 className="mb-4 !text-xl">My profile</h2>
            <dl className="grid gap-2">
              {profile.map(([Icon, k, v]) => (
                <div key={k} className="flex items-start gap-3 rounded-xl bg-[#f6f8fb] px-4 py-3">
                  <Icon size={17} className="mt-0.5 shrink-0 text-[#f7b800]" />
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[#5b6675]">{k}</dt>
                    <dd className="break-words font-medium text-[#1a2a80]">{v || "—"}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-[#5b6675]">To update your details, contact the iEagles team.</p>
          </section>

          <section>
            <h2 className="mb-4 !text-xl">Member resources</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {LINKS.map(({ href, icon: Icon, t, d }) => (
                <Link key={href} href={href} className="group rounded-2xl border border-[#e2e7ef] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7b800] text-[#1a2a80]"><Icon size={22} /></span>
                  <span className="block font-semibold text-[#1a2a80]">{t}</span>
                  <span className="block text-sm text-[#5b6675]">{d}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#1a2a80] transition-all group-hover:gap-2">Open <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {pwOpen && (
        <Modal title="Change your password" onClose={() => setPwOpen(false)}>
          <ChangePasswordForm onDone={() => setMe({ ...me, mustChangePassword: false })} />
        </Modal>
      )}
    </>
  );
}
