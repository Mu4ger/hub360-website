"use client";

import { motion } from "framer-motion";

const items = [
  { name: "EZCater", note: "Live" },
  { name: "DoorDash", note: "Roadmap" },
  { name: "Uber Eats", note: "Roadmap" },
  { name: "GrubHub", note: "Roadmap" },
];

export function IntegrationsBand() {
  return (
    <section className="border-y border-hub-ink/[0.06] bg-white/70 px-5 py-16 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] sm:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <p className="max-w-xs text-sm text-hub-ink/50 dark:text-white/50">
          Connect the channels reps already use-starting with catering, expanding to delivery.
        </p>
        <div className="flex flex-wrap gap-2">
          {items.map((x, i) => (
            <motion.span
              key={x.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-hub-ink/10 bg-hub-cream/80 px-4 py-2 text-sm font-medium text-hub-ink transition hover:border-hub-accent/40 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {x.name}
              <span
                className={
                  x.note === "Live"
                    ? "rounded-full bg-hub-accent/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-hub-ink/80 dark:text-hub-ink"
                    : "text-[10px] font-semibold uppercase tracking-wide text-hub-ink/35 dark:text-white/35"
                }
              >
                {x.note}
              </span>
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
