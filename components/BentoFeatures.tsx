"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { InteractiveSurface } from "@/components/InteractiveSurface";

const topRow = [
  {
    title: "Order in one place",
    body: "Catering and delivery in one flow—less app-hopping, fewer blind spots before checkout.",
    visualLabel: "Channels",
    icon: "flow",
    imageSrc: "/channels-dashboard.png",
  },
  {
    title: "Limits before checkout",
    body: "State posture enforced when it still costs nothing to fix—then every receipt stays structured.",
    visualLabel: "Policy",
    icon: "shield",
    imageSrc: "/policy-dashboard.png",
  },
];

const bottomRow = [
  {
    title: "Evidence by default",
    body: "Interactions shaped for Open Payments—not reconstructed after the fact.",
    icon: "file",
  },
  {
    title: "Officer visibility",
    body: "Territory signal without chasing reps for screenshots or spreadsheets.",
    icon: "eye",
  },
  {
    title: "Enterprise posture",
    body: "Controls and encryption aligned to how regulated teams buy software.",
    icon: "lock",
  },
];

const bentoRadius = "rounded-[2.75rem]";
const bentoPad = "p-10";
const bentoGap = "gap-7";

function CardIcon({ type, dark = false }: { type: string; dark?: boolean }) {
  const cls = dark ? "text-white" : "text-[var(--hub-blue-deep)] dark:text-[#d8ecff]";
  if (type === "flow") {
    return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><path d="M4 5.5h4l2 2h6M4 14.5h4l2-2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (type === "shield") {
    return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><path d="M10 3l5.6 2.2v4.2c0 3.3-2.2 5.3-5.6 7-3.4-1.7-5.6-3.7-5.6-7V5.2L10 3z" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 10.2l1.7 1.7 3.3-3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (type === "file") {
    return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><rect x="4.2" y="3.2" width="11.6" height="13.6" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M7.3 8h5.4M7.3 11h5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
  }
  if (type === "eye") {
    return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><path d="M2.8 10s2.3-4 7.2-4 7.2 4 7.2 4-2.3 4-7.2 4-7.2-4-7.2-4z" stroke="currentColor" strokeWidth="1.7"/><circle cx="10" cy="10" r="1.9" stroke="currentColor" strokeWidth="1.7"/></svg>;
  }
  return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><rect x="4.1" y="8.8" width="11.8" height="7.1" rx="1.7" stroke="currentColor" strokeWidth="1.7"/><path d="M6.8 8.8V7.1A3.2 3.2 0 0110 3.9a3.2 3.2 0 013.2 3.2v1.7" stroke="currentColor" strokeWidth="1.7"/></svg>;
}

export function BentoFeatures() {
  return (
    <section
      id="platform"
      className="section-y hub-ambient-bg scroll-mt-28 w-full px-5 sm:px-8 lg:px-10 xl:px-12"
    >
      <div className="mx-auto w-full max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="max-w-xl px-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-hub-ink/45 dark:text-white/45">
            Platform
          </p>
          <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.1rem)] font-semibold tracking-[-0.03em] text-hub-ink dark:text-white">
            Built for the moment spend happens.
          </h2>
        </motion.div>

        <div className={`mt-10 grid grid-cols-1 ${bentoGap} lg:grid-cols-2 xl:gap-8 2xl:gap-10`}>
          {topRow.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="h-full"
            >
              <InteractiveSurface
                intensity={7}
                className={`hub-glass flex h-full flex-col ${bentoRadius} ${bentoPad} transition duration-300 hover:shadow-[0_18px_46px_-24px_rgba(46,74,112,0.24)] dark:hover:shadow-[0_16px_42px_-20px_rgba(0,0,0,0.5)]`}
              >
                <div
                  className={`relative mb-10 aspect-[16/11] w-full overflow-hidden rounded-2xl border border-black/[0.04] bg-gradient-to-b from-[#eef6fc] to-[#dcecff] dark:border-white/10 dark:from-[#1a2838] dark:to-[var(--hub-dark-1)]`}
                >
                  <Image
                    src={c.imageSrc}
                    alt={`${c.visualLabel} dashboard preview`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/28 to-transparent dark:from-black/30" />
                  <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-hub-ink/70 shadow-sm dark:bg-black/40 dark:text-white/80">
                    {c.visualLabel}
                  </div>
                </div>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center">
                  <CardIcon type={c.icon} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-hub-ink dark:text-white">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-hub-ink/60 dark:text-white/60">{c.body}</p>
              </InteractiveSurface>
            </motion.article>
          ))}
        </div>

        {/* Bottom row: three equal cards + circular accent */}
        <div className={`mt-7 grid grid-cols-1 ${bentoGap} md:grid-cols-3 xl:gap-8 2xl:gap-10`}>
          {bottomRow.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.05 }}
              className="h-full"
            >
              <InteractiveSurface
                intensity={6}
                className={`${i === 1 ? "hub-dark-panel text-white" : "hub-glass"} flex h-full flex-col ${bentoRadius} ${bentoPad} transition duration-300 hover:shadow-[0_18px_44px_-24px_rgba(46,74,112,0.2)] dark:hover:shadow-[0_14px_38px_-18px_rgba(0,0,0,0.45)]`}
              >
                <div
                  className={`mb-6 flex h-10 w-10 shrink-0 items-center justify-center text-[13px] font-bold ${
                    i === 1
                      ? "text-white"
                      : "text-[var(--hub-blue-deep)] dark:text-[#d8ecff]"
                  }`}
                  aria-hidden
                >
                  <CardIcon type={c.icon} dark={i === 1} />
                </div>
                <h3 className={i === 1 ? "text-lg font-semibold tracking-tight text-white" : "text-lg font-semibold tracking-tight text-hub-ink dark:text-white"}>{c.title}</h3>
                <p className={i === 1 ? "mt-3 text-sm leading-relaxed text-white/74" : "mt-3 text-sm leading-relaxed text-hub-ink/58 dark:text-white/58"}>{c.body}</p>
              </InteractiveSurface>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
