"use client";

import { motion } from "framer-motion";

type PhoneMockupProps = {
  /** Light chrome on dark hero vs default on light sections */
  variant?: "default" | "onDark";
};

/**
 * Device frame without a separate “notch island” band - screen fills the rounded glass,
 * status row sits on the same surface (cleaner marketing mock).
 */
export function PhoneMockup({ variant = "default" }: PhoneMockupProps) {
  const onDark = variant === "onDark";
  const frame =
    "rounded-[2.75rem] bg-gradient-to-b from-white/22 via-white/10 to-white/[0.06] p-[2px] shadow-[0_32px_64px_-24px_rgba(0,0,0,0.45)] ring-1 ring-black/20 dark:from-white/15 dark:via-white/8 dark:to-transparent dark:ring-white/10";
  const glow = onDark
    ? "bg-hub-accent/20 group-hover/phone:bg-hub-accent/30"
    : "bg-hub-accent/15 group-hover/phone:bg-hub-accent/25 dark:bg-hub-accent/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      className="group/phone relative w-full max-w-[min(360px,calc(100vw-3rem))] sm:max-w-[380px]"
      style={{ aspectRatio: "393 / 852" }}
    >
      <div
        className={`pointer-events-none absolute -inset-6 rounded-[3.25rem] blur-3xl transition duration-700 ${glow}`}
      />
      <div className={`relative flex h-full w-full flex-col ${frame}`}>
        {/* Single glass screen - no black top cap, no Dynamic Island pill */}
        {/* Screen follows site dark mode - onDark only affects chrome/glow on the ink hero */}
        <div
          className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2.65rem] bg-white text-hub-ink shadow-inner ring-1 ring-black/[0.06] dark:bg-[#0c1118] dark:text-white dark:ring-white/10 ${
            onDark ? "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]" : ""
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-hub-ink/[0.06] px-4 pb-2 pt-3 dark:border-white/10">
            <span className="text-[11px] font-semibold tabular-nums tracking-wide text-hub-ink/45 dark:text-white/45">
              9:41
            </span>
            <span className="text-[11px] font-semibold tracking-tight text-hub-ink dark:text-white">
              HUB360
            </span>
            <span className="flex items-center gap-0.5" aria-hidden>
              <span className="h-2.5 w-0.5 rounded-full bg-hub-ink/20 dark:bg-white/30" />
              <span className="h-2.5 w-3 rounded-sm border border-hub-ink/15 dark:border-white/25" />
              <span className="h-2.5 w-1 rounded-full bg-hub-ink/20 dark:bg-white/30" />
            </span>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-5 pt-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-hub-ink/40 dark:text-white/40">
                Today
              </p>
              <p className="mt-1.5 text-[22px] font-bold tabular-nums tracking-[-0.02em] text-hub-ink dark:text-white">
                $847 of $2,400
              </p>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-hub-mist dark:bg-white/10">
                <motion.div
                  className="h-full w-[36%] rounded-full bg-hub-accent"
                  animate={{ opacity: [0.7, 1, 0.7], scaleX: [0.94, 1, 0.94] }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
            <div className="rounded-2xl border border-hub-ink/[0.08] bg-hub-cream/90 p-3.5 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold tracking-tight text-hub-ink dark:text-white">
                    Lunch · Dr. Kim
                  </p>
                  <p className="mt-0.5 text-xs text-hub-ink/50 dark:text-white/50">Oncology · Indiana</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                  OK
                </span>
              </div>
              <p className="mt-2.5 text-sm font-semibold text-hub-ink dark:text-white">$46.80 · EZCater</p>
              <p className="mt-1 text-xs text-hub-ink/45 dark:text-white/45">Limit $109 / person · auto-logged</p>
            </div>
            <div className="grid grid-cols-4 gap-1 rounded-2xl border border-hub-ink/[0.08] bg-hub-mist/40 p-1.5 dark:border-white/10 dark:bg-black/30">
              {["Order", "Log", "Report", "More"].map((t) => (
                <span
                  key={t}
                  className="rounded-xl py-2 text-center text-[10px] font-semibold text-hub-ink/45 dark:text-white/45"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 justify-center pb-2.5 pt-1">
            <div className="h-1 w-28 rounded-full bg-hub-ink/10 dark:bg-white/20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
