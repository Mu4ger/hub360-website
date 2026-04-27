"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PhoneMockup } from "@/components/PhoneMockup";

export function HeroSection() {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [heroSize, setHeroSize] = useState({ width: 0, height: 0 });
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: 6 + ((i * 17) % 88),
        delay: (i * 0.28) % 3.2,
        duration: 5.6 + (i % 6) * 0.55,
        size: 4 + (i % 4) * 1.4,
        opacity: 0.18 + (i % 5) * 0.06,
      })),
    []
  );

  return (
    <div className="relative w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <section
        id="hero"
        className="relative min-h-[780px] overflow-hidden rounded-[1.75rem] rounded-b-[2.75rem] bg-gradient-to-b from-[var(--hub-hero-from)] from-0% via-[var(--hub-hero-via)] via-[58%] to-[var(--hub-hero-to)] to-100% px-5 pb-24 pt-24 text-white sm:min-h-[860px] sm:rounded-[2rem] sm:rounded-b-[3rem] sm:px-8 sm:pb-28 sm:pt-28 lg:min-h-[920px] lg:px-10 lg:pb-32 lg:pt-32 xl:px-12 2xl:px-14"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHeroSize({ width: rect.width, height: rect.height });
          setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseLeave={() => setMouse(null)}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.07] to-transparent" />
          <div className="absolute -right-16 top-8 h-56 w-56 rounded-full bg-white/18 blur-3xl sm:top-12" />
          <div className="absolute -left-8 top-1/3 h-44 w-44 rounded-full bg-[#c0eaff]/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-40 w-[110%] max-w-none -translate-x-1/2 bg-gradient-to-t from-white/10 to-transparent blur-2xl" />
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => {
            const x = (p.left / 100) * heroSize.width;
            const y = heroSize.height * 0.86;
            const dx = mouse ? x - mouse.x : 0;
            const dy = mouse ? y - mouse.y : 0;
            const dist = Math.hypot(dx, dy);
            const maxDist = 140;
            const force = mouse && dist < maxDist ? (1 - dist / maxDist) * 20 : 0;
            const rx = dist ? (dx / dist) * force : 0;
            const ry = dist ? (dy / dist) * force : 0;

            return (
              <div
                key={p.id}
                className="absolute bottom-[-22px] transition-transform duration-300 ease-out"
                style={{ left: `${p.left}%`, transform: `translate(${rx}px, ${ry}px)` }}
              >
                <motion.div
                  className="rounded-full bg-white shadow-[0_0_16px_2px_rgba(207,240,255,0.65)]"
                  style={{
                    width: p.size,
                    height: p.size,
                    opacity: p.opacity,
                    filter: "blur(0.2px)",
                  }}
                  animate={{ y: [-6, -860], opacity: [0, p.opacity, p.opacity * 0.75, 0] }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: p.delay,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="relative mx-auto w-full max-w-content">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px] lg:gap-14 xl:grid-cols-[1fr_430px] xl:gap-16 2xl:grid-cols-[1fr_470px] 2xl:gap-20">
            <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70"
            >
              Sunshine Act · Open Payments
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-4 max-w-[16ch] text-balance text-[clamp(2.7rem,7vw,6.15rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-white lg:mx-0"
            >
              Meals, not paperwork
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/90 lg:mx-0 lg:text-lg xl:max-w-2xl xl:text-[1.2rem]"
            >
              Write compliant meal logs instantly that still sound like your team. Keep every order
              policy-safe and save 5+ hours weekly on reconciliation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href="#contact"
                className="inline-flex rounded-full bg-black px-8 py-3 text-sm font-semibold tracking-tight text-white shadow-[0_12px_24px_-14px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5"
              >
                Sign up for free
              </a>
              <a
                href="#compliance-tool"
                className="inline-flex rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition hover:-translate-y-0.5"
              >
                See workflow
              </a>
            </motion.div>
            <p className="mt-6 text-center text-xs font-medium tracking-wide text-white/65 lg:text-left">
              Unlimited transcripts · Gold-standard logs · Built for field teams
            </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup variant="onDark" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
