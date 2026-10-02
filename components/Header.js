"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, Mail, ArrowRight, UserCircle, ShieldCheck } from "lucide-react";
import MobileMenu, { MenuButton } from "@/components/MobileMenu";
import { NAV, SITE } from "@/lib/data";

const CTA = NAV.find((n) => n.highlight);
const ITEMS = NAV.filter((n) => !n.highlight);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname === "/" || pathname.startsWith("/admin")) return null; // home uses the hero navbar; admin has its own

  const close = () => setOpen(false);
  // Highlight one menu item: the section itself, else the first section that lists this page
  const matches = (item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) || item.children?.some((c) => !c.href.includes("#") && pathname.startsWith(c.href));
  const activeLabel = (ITEMS.find((i) => i.href !== "/" && pathname.startsWith(i.href)) ?? ITEMS.find(matches))?.label;
  const isActive = (item) => item.label === activeLabel;

  return (
    <header className="sticky top-0 z-50">
      {/* utility bar */}
      <div className={`overflow-hidden bg-[#0f1a55] text-xs text-white/80 transition-all duration-300 ${scrolled ? "max-h-0" : "max-h-10"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2">
          <span className="hidden sm:inline">
            <b className="font-semibold text-white">{SITE.fullName}</b> · {SITE.tagline}
          </span>
          <span className="ml-auto flex items-center gap-4">
            <a href={`mailto:${SITE.email}`} className="hidden items-center gap-1.5 hover:text-[#f7b800] md:inline-flex">
              <Mail size={12} /> {SITE.email}
            </a>
            <a href={`https://wa.me/${SITE.whatsapp}`} className="inline-flex items-center gap-1.5 hover:text-[#f7b800]">
              <Phone size={12} /> Helpline: {SITE.whatsappDisplay}
            </a>
            <Link href="/admin/login" className="inline-flex items-center gap-1.5 font-semibold text-[#f7b800] hover:text-white">
              <ShieldCheck size={12} /> Admin Login
            </Link>
          </span>
        </div>
      </div>

      <div className="px-4 py-3 md:px-6">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/60 bg-white/90 px-4 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "py-1.5 shadow-xl" : "py-2.5 shadow-md"
          }`}
          aria-label="Main"
        >
          <Link href="/" onClick={close} aria-label="iEagles home" className="flex shrink-0 items-center">
            <img src="/logo.png" alt="iEagles" className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-11"}`} />
          </Link>

          {/* Desktop */}
          <ul className="m-0 hidden list-none items-center p-0 text-[14px] font-medium xl:flex">
            {ITEMS.map((item) => {
              const wide = (item.children?.length ?? 0) > 5;
              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 transition-colors hover:text-[#1a2a80] ${
                      isActive(item) ? "text-[#1a2a80]" : "text-[#1c2430]"
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />}
                    <span
                      className={`absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left rounded bg-[#f7b800] transition-transform duration-300 ${
                        isActive(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>

                  {item.children && (
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className={`relative rounded-2xl border border-[#e2e7ef] bg-white p-2 shadow-2xl ${wide ? "grid w-[480px] grid-cols-2 gap-x-1" : "min-w-[240px]"}`}>
                        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[#e2e7ef] bg-white" />
                        {item.children.map((c) => (
                          <Link
                            key={c.href + c.label}
                            href={c.href}
                            className="group/i flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-[#1c2430] transition hover:bg-[#f6f8fb] hover:text-[#1a2a80]"
                          >
                            {c.label}
                            <ArrowRight size={14} className="shrink-0 text-[#f7b800] opacity-0 transition group-hover/i:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/member-login"
              aria-label="Member Log in"
              title="Member Log in"
              className="hidden h-10 w-10 items-center justify-center rounded-xl text-[#1a2a80] transition hover:bg-[#f6f8fb] sm:flex"
            >
              <UserCircle size={24} />
            </Link>
            {CTA && (
              <Link
                href={CTA.href}
                className="hidden items-center gap-2 whitespace-nowrap rounded-xl bg-[#f7b800] px-4 py-2.5 text-sm font-semibold text-[#1a2a80] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
              >
                {CTA.label} <ArrowRight size={16} />
              </Link>
            )}
            <MenuButton open={open} onClick={() => setOpen(!open)} />
          </div>
        </nav>

        <MobileMenu open={open} onClose={close} />
      </div>
    </header>
  );
}
