"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu, X, ChevronDown, Home, Info, CalendarDays, UserCircle, MapPinned, BookOpen, Phone, Store, ArrowRight, MessageCircle, GraduationCap, LogIn,
} from "lucide-react";
import { NAV, SITE } from "@/lib/data";

const ICONS: Record<string, typeof Home> = {
  Home, "About us": Info, "iEagles Academy": GraduationCap, "Programs & Events": CalendarDays, Membership: UserCircle,
  "Contact us": Phone, "Business Directory": Store,
};

export function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border-0 bg-[#f7b800] text-[#1a2a80] shadow-md transition active:scale-95 xl:hidden"
    >
      <Menu size={22} className={`absolute transition-all duration-300 ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
      <X size={22} className={`absolute transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
    </button>
  );
}

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", esc);
    };
  }, [open, onClose]);

  if (!open) return null;
  const cta = NAV.find((n) => n.highlight);
  const items = NAV.filter((n) => !n.highlight);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden" onClick={onClose} aria-hidden="true" />
      <div
        className="absolute inset-x-4 top-full z-50 mt-3 max-h-[calc(100dvh-8rem)] overflow-auto rounded-3xl border border-white/15 p-3 text-white shadow-2xl md:inset-x-6 xl:hidden"
        style={{ background: "linear-gradient(160deg,#0f1a55,#1a2a80)", animation: "feedIn .25s ease both" }}
      >
        <div className="grid gap-1">
          {items.map((item) => {
            const Icon = ICONS[item.label] ?? Home;
            const isOpen = sub === item.label;
            return (
              <div key={item.label} className={`rounded-2xl transition ${isOpen ? "bg-white/10" : ""}`}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex flex-1 items-center gap-3 rounded-2xl px-3 py-3 text-base font-medium ${active(item.href) ? "text-[#f7b800]" : "text-white"}`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${active(item.href) ? "bg-[#f7b800] text-[#1a2a80]" : "bg-white/10 text-[#f7b800]"}`}>
                      <Icon size={20} />
                    </span>
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      aria-label={`Toggle ${item.label}`}
                      aria-expanded={isOpen}
                      onClick={() => setSub(isOpen ? null : item.label)}
                      className="mr-1 flex h-11 w-11 items-center justify-center rounded-xl border-0 bg-transparent text-white/80"
                    >
                      <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#f7b800]" : ""}`} />
                    </button>
                  )}
                </div>
                {item.children && isOpen && (
                  <div className="mx-3 mb-3 flex flex-col gap-1 border-l-2 border-[#f7b800] pl-4">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={onClose} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] text-white/85 active:bg-white/10">
                        {c.label}
                        <ArrowRight size={14} className="text-[#f7b800]" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
          <Link href="/member-login" onClick={onClose} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-semibold text-white ring-1 ring-white/20">
            <LogIn size={18} /> Member Log in
          </Link>
          {cta && (
            <Link href={cta.href} onClick={onClose} className="flex items-center justify-center gap-2 rounded-xl bg-[#f7b800] py-3.5 font-semibold text-[#1a2a80]">
              <Store size={18} /> {cta.label}
            </Link>
          )}
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3.5 font-semibold text-white">
            <MessageCircle size={18} /> WhatsApp {SITE.whatsappDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
