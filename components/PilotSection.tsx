"use client";

import { motion } from "framer-motion";

export function PilotSection() {
  return (
    <section id="contact" className="scroll-mt-28 px-5 py-28 sm:px-8">
      <div className="mx-auto w-full max-w-content">
        <div className="mx-auto max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-hub-ink/40 dark:text-white/40">
              Pilot
            </p>
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
              className="min-h-[48px] flex-1 rounded-full border border-hub-ink/12 bg-white px-5 text-sm text-hub-ink placeholder:text-hub-ink/35 shadow-sm transition focus:border-hub-accent focus:outline-none focus:ring-2 focus:ring-hub-accent/30 dark:border-white/10 dark:bg-[#121a24] dark:text-white dark:placeholder:text-white/35"
            />
            <button
              type="submit"
              className="min-h-[48px] shrink-0 rounded-full bg-hub-ink px-8 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md dark:bg-hub-accent dark:text-hub-ink"
            >
              Request access
            </button>
          </motion.form>
          <p className="mt-4 text-xs text-hub-ink/40 dark:text-white/35">We reply within one business day.</p>
        </div>
      </div>
    </section>
  );
}
