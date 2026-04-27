"use client";

import { motion } from "framer-motion";
import { InteractiveSurface } from "@/components/InteractiveSurface";

type RiskSectionProps = {
  splitLayout?: boolean;
};

export function RiskSection({ splitLayout = false }: RiskSectionProps) {
  return (
    <section
      id="why"
      className={
        splitLayout
          ? "section-y hub-ambient-bg scroll-mt-28 px-5 sm:px-8"
          : "section-y hub-ambient-bg scroll-mt-28 border-y border-hub-ink/[0.06] px-5 dark:border-white/10 sm:px-8"
      }
    >
      <div className={splitLayout ? "mx-auto w-full max-w-none" : "mx-auto w-full max-w-content"}>
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
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-[-0.03em] text-hub-ink dark:text-white">
              Inaccurate Open Payments data is not a paperwork problem-it is a liability.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="h-full"
          >
            <InteractiveSurface
              intensity={6}
              className="hub-dark-panel hover-pop rounded-3xl p-8 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-white" fill="none"><path d="M10 3l6 10.2H4L10 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M10 7.5v3.3M10 12.9h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
              </div>
              <p className="text-sm font-medium text-white/56">CMS civil monetary penalties</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Up to <span className="text-hub-accent">$1.15M</span>
              </p>
              <p className="mt-2 text-sm text-white/70">
                per year for applicable manufacturers that fail to report under federal transparency
                requirements-alongside reputational damage and audit drag.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/52">
                Source:{" "}
                <a
                  href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-180"
                  className="underline decoration-hub-accent/60 underline-offset-2 transition hover:text-hub-accent"
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
                className="mt-8 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-hub-ink transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Talk to us about exposure
              </a>
            </InteractiveSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
