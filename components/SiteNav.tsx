"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#why", label: "Why it matters" },
  { href: "#platform", label: "Platform" },
  { href: "#compliance-tool", label: "Map" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hub-ink/[0.06] bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0f14]/85">
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a
          href="#"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-hub-ink transition hover:opacity-80 dark:text-white"
        >
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-hub-ink text-[11px] font-bold text-white dark:bg-hub-accent dark:text-hub-ink"
            aria-hidden
          >
            H
          </span>
          HUB360
        </a>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <ul className="flex items-center gap-10">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[13px] text-hub-ink/50 transition hover:text-hub-ink dark:text-white/50 dark:hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#compliance-tool"
            className="text-[13px] text-hub-ink/50 transition hover:text-hub-ink dark:text-white/50 dark:hover:text-white"
          >
            Explore map
          </a>
          <a
            href="#contact"
            className="rounded-full bg-hub-ink px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-hub-ink/90 hover:shadow-md dark:bg-hub-accent dark:text-hub-ink dark:hover:brightness-110"
          >
            Request a demo
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hub-ink/10 text-hub-ink dark:border-white/10 dark:text-white"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-hub-ink/[0.06] bg-white dark:border-white/10 dark:bg-[#0b0f14] md:hidden"
          >
            <nav className="mx-auto flex w-full max-w-content flex-col px-5 py-4 sm:px-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-2.5 text-sm text-hub-ink/70 hover:bg-hub-mist/80 dark:text-white/70 dark:hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-3 rounded-full bg-hub-ink py-3 text-center text-sm font-semibold text-white dark:bg-hub-accent dark:text-hub-ink"
                onClick={() => setOpen(false)}
              >
                Request a demo
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
