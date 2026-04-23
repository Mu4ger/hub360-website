"use client";

import { motion } from "framer-motion";

export function RiskSection() {
  return (
    <section
      id="why"
      className="scroll-mt-28 border-y border-hub-ink/[0.06] bg-gradient-to-b from-white to-hub-mist/40 px-5 py-24 dark:border-white/10 dark:from-[#0f141c] dark:to-[#0b0f14] sm:px-8"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-hub-ink/40 dark:text-white/40">
              Why it matters
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-hub-ink dark:text-white sm:text-4xl lg:text-[2.4rem]">
              Inaccurate Open Payments data is not a paperwork problem-it is a liability.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="rounded-3xl border border-hub-ink/[0.08] bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#121a24]"
          >
            <p className="text-sm font-medium text-hub-ink/50 dark:text-white/50">
              CMS civil monetary penalties
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-hub-ink dark:text-white sm:text-5xl">
              Up to <span className="text-hub-accent">$1.15M</span>
            </p>
            <p className="mt-2 text-sm text-hub-ink/55 dark:text-white/55">
              per year for applicable manufacturers that fail to report under federal transparency
              requirements-alongside reputational damage and audit drag.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-hub-ink/40 dark:text-white/40">
              Source:{" "}
              <a
                href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-180"
                className="underline decoration-hub-accent/50 underline-offset-2 transition hover:text-hub-ink dark:hover:text-hub-accent"
                target="_blank"
                rel="noreferrer"
              >
                45 CFR Part 180
              </a>{" "}
              (Open Payments program rules). Consult counsel for obligations specific to your
              organization.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-hub-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md dark:bg-hub-accent dark:text-hub-ink"
            >
              Talk to us about exposure
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
