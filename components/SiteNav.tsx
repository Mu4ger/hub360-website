"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#platform", label: "Use cases" },
  { href: "#platform", label: "Features" },
  { href: "#contact", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [onLightBackground, setOnLightBackground] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const readDarkMode = () => document.documentElement.classList.contains("dark");

    setIsDarkMode(readDarkMode());
    const classObserver = new MutationObserver(() => {
      setIsDarkMode(readDarkMode());
    });
    classObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const updateNavContrast = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setOnLightBackground(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setOnLightBackground(rect.bottom <= 96);
    };

    updateNavContrast();
    window.addEventListener("scroll", updateNavContrast, { passive: true });
    window.addEventListener("resize", updateNavContrast);
    return () => {
      classObserver.disconnect();
      window.removeEventListener("scroll", updateNavContrast);
      window.removeEventListener("resize", updateNavContrast);
    };
  }, []);

  const useLightTheme = onLightBackground && !isDarkMode;
  const shellClass = useLightTheme
    ? "border-black/10 bg-white/55 shadow-[0_8px_28px_-18px_rgba(7,7,9,0.35)]"
    : "border-white/20 bg-white/10 shadow-[0_8px_28px_-18px_rgba(0,0,0,0.35)]";
  const textClass = useLightTheme ? "text-[#070709]/85 hover:text-[#070709]" : "text-white/90 hover:text-white";
  const iconClass = useLightTheme
    ? "border-black/15 bg-white/45 text-[#070709]"
    : "border-white/35 bg-white/5 text-white";
  const caretClass = useLightTheme ? "text-[#070709]/60" : "text-white/80";
  const mobileTriggerClass = useLightTheme
    ? "border-black/15 bg-white/45 text-[#070709]"
    : "border-white/35 bg-white/5 text-white";

  return (
    <header className="fixed left-1/2 top-3 z-50 w-full -translate-x-1/2 px-3 sm:top-3.5 sm:px-4">
      <div
        className={`mx-auto flex w-full max-w-content items-center justify-between gap-4 rounded-[120px] border px-2 py-1.5 backdrop-blur-xl transition-colors duration-300 sm:gap-6 sm:px-3 ${shellClass}`}
      >
        <a
          href="#"
          className={`flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em] transition ${textClass}`}
        >
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border text-[11px] font-bold backdrop-blur-sm transition-colors duration-300 ${iconClass}`}
            aria-hidden
          >
            <Image
              src="/hub360-logo.png"
              alt="HUB360 logo"
              width={20}
              height={20}
              className="h-5 w-5 rounded-[4px] object-cover"
            />
          </span>
          HUB360
        </a>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <ul className="flex items-center gap-8 lg:gap-10">
            {links.map((l, i) => (
              <li key={`${l.href}-${l.label}`}>
                <a
                  href={l.href}
                  className={`inline-flex items-center gap-1 text-[14px] font-medium tracking-[-0.01em] transition ${textClass}`}
                >
                  {l.label}
                  {i < 2 ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M2.25 4.5L6 8.25L9.75 4.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={caretClass}
                      />
                    </svg>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href="#platform"
            className={`px-2 text-[14px] font-medium tracking-[-0.01em] transition ${textClass}`}
          >
            Login
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-white/10 bg-white px-4 py-2 text-[14px] font-semibold tracking-[-0.01em] text-[#070709] transition hover:brightness-95"
          >
            Sign up
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-300 ${mobileTriggerClass}`}
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
            className="mt-2 overflow-hidden rounded-[28px] border border-white/20 bg-[rgba(12,20,34,0.42)] backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex w-full max-w-content flex-col px-4 py-4 sm:px-5">
              {links.map((l, i) => (
                <a
                  key={`${l.href}-${l.label}-mobile`}
                  href={l.href}
                  className="inline-flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium tracking-[-0.01em] text-white/90 transition hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <span>{l.label}</span>
                  {i < 2 ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M2.25 4.5L6 8.25L9.75 4.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white/75"
                      />
                    </svg>
                  ) : null}
                </a>
              ))}
              <a
                href="#platform"
                className="mt-2 rounded-xl px-3 py-2.5 text-[14px] font-medium tracking-[-0.01em] text-white/90 transition hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Login
              </a>
              <a
                href="#contact"
                className="mt-3 rounded-full border-2 border-white/10 bg-white py-3 text-center text-[14px] font-semibold tracking-[-0.01em] text-[#070709] transition hover:brightness-95"
                onClick={() => setOpen(false)}
              >
                Sign up
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
