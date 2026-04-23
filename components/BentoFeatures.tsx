"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Order in one place",
    body: "Catering and delivery, unified-less app-hopping, fewer blind spots.",
    span: "lg:col-span-7",
  },
  {
    title: "Limits before checkout",
    body: "State posture enforced when it still costs nothing to fix.",
    span: "lg:col-span-5",
    highlight: true,
  },
  {
    title: "Evidence by default",
    body: "Interactions structured for Open Payments-not reconstructed after the fact.",
    span: "lg:col-span-4",
  },
  {
    title: "Officer visibility",
    body: "Territory signal without chasing reps for screenshots.",
    span: "lg:col-span-4",
  },
  {
    title: "Enterprise posture",
    body: "Controls and encryption aligned to how regulated teams buy software.",
    span: "lg:col-span-4",
  },
];

export function BentoFeatures() {
  return (
    <section id="platform" className="scroll-mt-28 px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="max-w-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-hub-ink/40 dark:text-white/40">
            Platform
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-hub-ink dark:text-white sm:text-4xl">
            Built for the moment spend happens.
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className={`rounded-3xl border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${c.span} ${
                c.highlight
                  ? "border-hub-accent/20 bg-gradient-to-br from-[#e8f6fb] to-[#d4eef8] shadow-sm dark:border-hub-accent/25 dark:from-[#1a3044] dark:to-[#152a3a]"
                  : "border-hub-ink/[0.06] bg-white shadow-card dark:border-white/10 dark:bg-[#121a24]"
              }`}
            >
              <h3 className="text-lg font-semibold text-hub-ink dark:text-white">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-hub-ink/55 dark:text-white/55">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
