"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "$13.2B+", label: "Industry payments · placeholder until your CMS pull" },
  { value: "16M+", label: "Published records · swap for your cut of the dataset" },
  { value: "50+", label: "State signals you can operationalize in-product" },
];

export function ScaleStrip() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-content">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-[0.26em] text-hub-ink/38 dark:text-white/38"
        >
          Scale · you will wire real figures
        </motion.p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.value}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="rounded-3xl border border-hub-ink/[0.06] bg-white px-6 py-8 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#121a24]"
            >
              <p className="text-3xl font-semibold tracking-tight text-hub-ink dark:text-white sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-hub-ink/45 dark:text-white/45">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
