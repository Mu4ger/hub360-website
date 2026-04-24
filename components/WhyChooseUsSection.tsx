"use client";

import { motion } from "framer-motion";

const reasons = [
  "Guided workflows that reduce manual reconciliation for reps and compliance teams.",
  "High-fidelity reporting outputs aligned to Sunshine Act and Open Payments requirements.",
  "Fast rollout with familiar ordering behavior and stronger audit readiness from day one.",
];

export function WhyChooseUsSection() {
  return (
    <section className="border-y border-hub-ink/[0.06] bg-white/70 px-5 py-20 dark:border-white/10 dark:bg-[#0f141c]/70 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-content">
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
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="rounded-3xl border border-hub-ink/[0.08] bg-hub-cream p-7 dark:border-white/10 dark:bg-[#121a24]"
            >
              <p className="text-[17px] font-medium leading-relaxed text-hub-ink dark:text-white">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
