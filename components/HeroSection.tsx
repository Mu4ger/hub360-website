"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "@/components/PhoneMockup";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-hub-ink pt-24 text-white sm:pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -right-1/4 top-0 h-[70%] w-[70%] rounded-full bg-hub-accent/25 blur-[120px]" />
        <div className="absolute -left-1/4 bottom-0 h-1/2 w-1/2 rounded-full bg-white/5 blur-[100px]" />
      </div>
      <div className="relative mx-auto w-full max-w-[min(1400px,calc(100vw-3rem))] px-6 pb-20 pt-4 sm:px-10 sm:pb-24 md:px-14 lg:px-16 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_min(380px,34vw)] lg:gap-16 xl:grid-cols-[1fr_400px]">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50"
            >
              Sunshine Act · Open Payments
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
            >
              Meals that meet the rule.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-8 max-w-xl text-lg font-medium leading-relaxed tracking-[-0.01em] text-white/85 lg:mx-0 lg:text-xl"
            >
              Order once and stay audit-ready with{" "}
              <strong className="font-semibold text-white">limits enforced before checkout.</strong>{" "}
              Enjoy <strong className="font-semibold text-white">CMS-structured logs</strong> on every
              meal. Save <strong className="font-semibold text-white">hours each week</strong> on
              reconciliation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href="#contact"
                className="inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold tracking-tight text-hub-ink shadow-lg transition hover:-translate-y-0.5 hover:bg-hub-mist hover:shadow-xl"
              >
                Request a demo
              </a>
              <a
                href="#compliance-tool"
                className="inline-flex rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
              >
                Open compliance map
              </a>
            </motion.div>
            <p className="mt-8 text-center text-xs font-medium tracking-wide text-white/40 lg:text-left">
              Preview UI for storytelling—pilot builds may differ.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup variant="onDark" />
          </div>
        </div>
      </div>
    </section>
  );
}
