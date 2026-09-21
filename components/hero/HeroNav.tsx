"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV, SITE } from "@/lib/data";

const chatHref = `https://wa.me/${SITE.whatsapp}`;

export default function HeroNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="relative px-6 pt-6 md:px-12 lg:px-16">
      <nav className="liquid-glass !overflow-visible flex items-center justify-between rounded-xl px-4 py-2">
        <Link href="/" aria-label="iEagle home" className="flex items-center" onClick={close}>
          <img src="/logo.png" alt="iEagle" className="h-10 w-auto" />
        </Link>

        {/* Desktop full menu */}
        <ul className="m-0 hidden list-none items-center gap-1 p-0 text-sm xl:flex">
          {NAV.map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className={`block rounded-lg px-3 py-2 transition-colors ${
                  item.highlight ? "bg-white/15 hover:bg-white/25" : "hover:text-gray-300"
                }`}
              >
                {item.label}
                {item.children ? <ChevronDown size={13} className="ml-1 inline opacity-70" /> : null}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[210px] rounded-xl border border-white/20 bg-black/70 p-1.5 backdrop-blur-md">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-white/15"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={chatHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
          >
            Start a Chat
          </a>
          <button
            className="rounded-lg px-2 py-1 text-2xl text-white xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      {open && (
        <div className="absolute left-6 right-6 top-full z-50 mt-2 max-h-[75vh] overflow-auto rounded-xl border border-white/20 bg-black/80 p-3 backdrop-blur-md md:left-12 md:right-12 lg:left-16 lg:right-16 xl:hidden">
          {NAV.map((item) => (
            <div key={item.label} className="py-1">
              <Link
                href={item.href}
                onClick={close}
                className={`block rounded-lg px-3 py-2 font-medium ${item.highlight ? "bg-white/15" : ""}`}
              >
                {item.label}
              </Link>
              {item.children?.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={close}
                  className="block rounded-lg py-1.5 pl-7 pr-3 text-sm text-gray-300 hover:bg-white/10"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
