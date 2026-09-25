"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, UserCircle } from "lucide-react";
import { NAV, SITE } from "@/lib/data";
import MobileMenu, { MenuButton } from "@/components/MobileMenu";

const chatHref = `https://wa.me/${SITE.whatsapp}`;

export default function HeroNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="relative px-6 pt-6 md:px-12 lg:px-16">
      <nav className="liquid-glass !overflow-visible flex items-center justify-between rounded-xl px-4 py-2">
        <Link href="/" aria-label="iEagles home" className="flex shrink-0 items-center" onClick={close}>
          <img src="/logo.png" alt="iEagles" className="h-14 w-auto md:h-16" />
        </Link>

        {/* Desktop full menu */}
        <ul className="m-0 hidden list-none items-center p-0 text-sm xl:flex">
          {NAV.map((item, idx) => {
            const wide = (item.children?.length ?? 0) > 5;
            const alignRight = idx >= NAV.length - 3;
            return (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 transition-colors ${
                    item.highlight ? "ml-1 bg-[#f7b800] font-semibold text-[#1a2a80] hover:brightness-105" : "hover:text-[#f7b800]"
                  }`}
                >
                  {item.label}
                  {item.children ? <ChevronDown size={13} className="opacity-70 transition-transform group-hover:rotate-180" /> : null}
                </Link>
                {item.children && (
                  <div
                    className={`invisible absolute top-full z-50 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
                      alignRight ? "right-0" : "left-0"
                    }`}
                  >
                    <div className={`rounded-xl border border-white/20 bg-[#0f1a55]/85 p-1.5 shadow-2xl backdrop-blur-md ${wide ? "grid w-[460px] grid-cols-2 gap-x-1" : "min-w-[220px]"}`}>
                      {item.children.map((c) => (
                        <Link key={c.href + c.label} href={c.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-white/15 hover:text-[#f7b800]">
                          {c.label}
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
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/15 sm:flex"
          >
            <UserCircle size={24} />
          </Link>
          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 xl:hidden 2xl:inline-block"
          >
            Start a Chat
          </a>
          <MenuButton open={open} onClick={() => setOpen(!open)} />
        </div>
      </nav>

      <MobileMenu open={open} onClose={close} />
    </div>
  );
}
