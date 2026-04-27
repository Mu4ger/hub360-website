"use client";

import { motion } from "framer-motion";
import { BentoLettersSlide, SwipeCardCarousel } from "@/components/SwipeCardCarousel";

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

const whyChooseReasons = [
  "Guided workflows that reduce manual reconciliation for reps and compliance teams.",
  "High-fidelity reporting outputs aligned to Sunshine Act and Open Payments requirements.",
  "Fast rollout with familiar ordering behavior and stronger audit readiness from day one.",
];

const combinedSlides = [
  ...pillars.map((pillar) => ({
    title: pillar.title,
    body: pillar.body,
    group: "Compliance",
    icon: "compliance",
  })),
  ...whyChooseReasons.map((reason) => ({
    title: "Why choose HUB360",
    body: reason,
    group: "Why choose us",
    icon: "value",
  })),
];

function SlideIcon({ type, dark = false }: { type: string; dark?: boolean }) {
  const cls = dark ? "text-white" : "text-[var(--hub-blue-deep)] dark:text-[#d8ecff]";
  if (type === "compliance") {
    return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><path d="M10 3l5.6 2.2v4.2c0 3.3-2.2 5.3-5.6 7-3.4-1.7-5.6-3.7-5.6-7V5.2L10 3z" stroke="currentColor" strokeWidth="1.7"/><path d="M7.5 10.2l1.7 1.7 3.3-3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  return <svg viewBox="0 0 20 20" className={`h-4 w-4 ${cls}`} fill="none"><path d="M3.2 10h13.6M10 3.2v13.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="10" cy="10" r="6.8" stroke="currentColor" strokeWidth="1.4"/></svg>;
}

export function ComplianceSimplifiedSection() {
  return (
    <section className="section-y hub-ambient-bg w-full px-5 sm:px-8 lg:px-10 xl:px-12">
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

        <SwipeCardCarousel
          lettersStyle
          fadeFromClass="from-transparent"
          hint="Swipe horizontally to explore pillars and why teams choose HUB360"
        >
          {combinedSlides.map((slide, i) => (
            <BentoLettersSlide key={`${slide.group}-${i}`} isHighlight={i === 0}>
              <div
                className="mb-4 inline-flex h-9 w-9 items-center justify-center"
              >
                <SlideIcon type={slide.icon} dark={i === 0} />
              </div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                  i === 0 ? "text-white/70" : "text-hub-ink/45 dark:text-white/45"
                }`}
              >
                {slide.group}
              </p>
              <h3
                className={`text-2xl font-semibold leading-tight tracking-[-0.02em] ${
                  i === 0 ? "text-white" : "text-hub-ink dark:text-white"
                }`}
              >
                {slide.title}
              </h3>
              <p
                className={`mt-4 text-[15px] leading-relaxed ${
                  i === 0 ? "text-white/90" : "text-hub-ink/65 dark:text-white/65"
                }`}
              >
                {slide.body}
              </p>
            </BentoLettersSlide>
          ))}
        </SwipeCardCarousel>
      </div>
    </section>
  );
}
