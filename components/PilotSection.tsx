"use client";

import { motion } from "framer-motion";
import { InteractiveSurface } from "@/components/InteractiveSurface";

export function PilotSection() {
  return (
    <section id="contact" className="hub-ambient-bg scroll-mt-28 px-5 py-28 sm:px-8">
      <div className="mx-auto w-full max-w-content">
        <InteractiveSurface intensity={5} className="hub-glass-strong hover-pop relative mx-auto max-w-lg rounded-[2rem] p-8 text-center sm:p-10">
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(14,23,37,0.26)_0%,rgba(14,23,37,0)_72%)] blur-xl dark:bg-[radial-gradient(circle,rgba(146,197,242,0.2)_0%,rgba(146,197,242,0)_72%)]" />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-hub-ink/45 dark:border-white/12 dark:bg-white/8 dark:text-white/45">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none"><path d="M10 3l2 4.1L16.5 8 13 11.2 13.8 16 10 13.7 6.2 16 7 11.2 3.5 8 8 7.1 10 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              Pilot
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-hub-ink dark:text-white sm:text-4xl">
              See HUB360 on your stack.
            </h2>
            <p className="mt-4 text-sm text-hub-ink/50 dark:text-white/50">
              Fortune 50 design partners only for now-tell us where you are in rollout.
            </p>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Work email"
              className="min-h-[48px] flex-1 rounded-full border border-hub-ink/12 bg-white/85 px-5 text-sm text-hub-ink placeholder:text-hub-ink/35 shadow-sm transition focus:border-hub-accent focus:outline-none focus:ring-2 focus:ring-hub-accent/30 dark:border-white/10 dark:bg-[#121a24] dark:text-white dark:placeholder:text-white/35"
            />
            <button
              type="submit"
              className="min-h-[48px] shrink-0 rounded-full bg-hub-ink px-8 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md dark:bg-hub-accent dark:text-hub-ink"
            >
              Request access
            </button>
          </motion.form>
          <p className="mt-4 text-xs text-hub-ink/40 dark:text-white/35">We reply within one business day.</p>
        </InteractiveSurface>
      </div>
    </section>
  );
}
