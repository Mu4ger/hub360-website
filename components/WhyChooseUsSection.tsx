"use client";

import { motion } from "framer-motion";

const reasons = [
  "Guided workflows that reduce manual reconciliation for reps and compliance teams.",
  "High-fidelity reporting outputs aligned to Sunshine Act and Open Payments requirements.",
  "Fast rollout with familiar ordering behavior and stronger audit readiness from day one.",
];

type WhyChooseUsSectionProps = {
  /** Side-by-side with Risk on large screens; borders handled by parent row */
  splitLayout?: boolean;
};

export function WhyChooseUsSection({ splitLayout = false }: WhyChooseUsSectionProps) {
  return (
    <section
      className={
        splitLayout
          ? "section-y border-b border-hub-ink/[0.06] bg-white px-5 dark:border-white/10 dark:bg-[var(--hub-dark-1)] sm:px-8 lg:border-b-0 lg:border-r"
          : "section-y border-y border-hub-ink/[0.06] bg-white px-5 dark:border-white/10 dark:bg-[var(--hub-dark-1)] sm:px-8"
      }
    >
      <div className={splitLayout ? "w-full" : "mx-auto w-full max-w-content"}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-[clamp(2rem,3.7vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-hub-ink dark:text-white">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-snug text-hub-ink/70 dark:text-white/70 sm:text-xl">
            HUB360 combines automation and policy controls so teams can spend less time on admin
            and more time supporting provider relationships.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.article
              key={reason}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.38, delay: i * 0.05 }}
              className={
                i === 0
                  ? "rounded-[1.75rem] bg-[var(--hub-blue-2)] p-6 text-white"
                  : "rounded-[1.75rem] border border-black/[0.06] bg-white p-6 text-hub-ink dark:border-white/10 dark:bg-[var(--hub-dark-2)] dark:text-white"
              }
            >
              <div
                className={
                  i === 0
                    ? "mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-hub-ink"
                    : "mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.06] text-xs font-semibold text-hub-ink dark:bg-white/10 dark:text-white"
                }
              >
                {i + 1}
              </div>
              <p className={i === 0 ? "text-[15px] leading-relaxed text-white/95" : "text-[15px] leading-relaxed"}>
                {reason}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
