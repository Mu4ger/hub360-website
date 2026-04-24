"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    title: "Real-time sign-in and event tracking",
    body: "Capture meal details and attendees at the moment of spend so records stay complete.",
  },
  {
    title: "Automated expense controls",
    body: "Apply spend rules before checkout by state and role, then keep every receipt structured.",
  },
  {
    title: "Built-in compliance intelligence",
    body: "Surface risk signals early with clear flags, audit trails, and report-ready exports.",
  },
];

export function ComplianceSimplifiedSection() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-[clamp(2.1rem,4vw,3.35rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-hub-ink dark:text-white">
            Compliance Simplified. Productivity Amplified.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-snug text-hub-ink/70 dark:text-white/70 sm:text-xl">
            Built for pharma and biotech teams managing Transfer of Value reporting with
            real-time validation that reduces reconciliation work each week.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="rounded-3xl border border-hub-ink/[0.08] bg-white p-7 shadow-card dark:border-white/10 dark:bg-[#121a24]"
            >
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.01em] text-hub-ink dark:text-white">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-hub-ink/60 dark:text-white/60">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
