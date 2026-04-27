"use client";

import { motion } from "framer-motion";
import { InteractiveSurface } from "@/components/InteractiveSurface";

const metrics = [
  { value: "$13.2B+", label: "Industry payments · placeholder until your CMS pull", icon: "currency" },
  { value: "16M+", label: "Published records · swap for your cut of the dataset", icon: "records" },
  { value: "50+", label: "State signals you can operationalize in-product", icon: "signal" },
];

function MetricIcon({ type, dark = false }: { type: string; dark?: boolean }) {
  const cls = dark ? "text-white" : "text-[var(--hub-blue-deep)] dark:text-[#d8ecff]";
  if (type === "currency") {
    return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><path d="M10 3v14M13.8 6.3c-.7-.7-2-1.1-3.3-1.1-2 0-3.4 1-3.4 2.5 0 1.8 1.8 2.3 3.4 2.7 1.7.4 3.4.9 3.4 2.7 0 1.6-1.5 2.7-3.5 2.7-1.3 0-2.7-.4-3.5-1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
  }
  if (type === "records") {
    return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><rect x="3.8" y="4" width="12.4" height="12" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M7 8h6M7 11h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
  }
  return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><path d="M3 13.2h2.8l2.2-3.7 2.4 4.3 2.2-3h4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ScaleStrip() {
  return (
    <section className="hub-ambient-bg px-5 py-20 sm:px-8">
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
              className="h-full"
            >
              <InteractiveSurface
                intensity={6}
                className={`${i === 1 ? "hub-dark-panel text-white" : "hub-glass"} hover-pop flex h-full flex-col items-center rounded-3xl px-6 py-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center">
                  <MetricIcon type={m.icon} dark={i === 1} />
                </span>
                <p className={i === 1 ? "text-3xl font-semibold tracking-tight text-white sm:text-4xl" : "text-3xl font-semibold tracking-tight text-hub-ink dark:text-white sm:text-4xl"}>
                  {m.value}
                </p>
                <p className={i === 1 ? "mt-3 text-xs leading-relaxed text-white/70" : "mt-3 text-xs leading-relaxed text-hub-ink/45 dark:text-white/45"}>{m.label}</p>
              </InteractiveSurface>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
