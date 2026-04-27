"use client";

const items = [
  { name: "EZCater", note: "Live" },
  { name: "DoorDash", note: "Roadmap" },
  { name: "Uber Eats", note: "Roadmap" },
  { name: "GrubHub", note: "Roadmap" },
];

export function IntegrationsBand() {
  const repeated = [...items, ...items, ...items];

  return (
    <section className="hub-ambient-bg w-full py-8 sm:py-10">
      <div className="hub-glass-strong w-full border-x-0 rounded-none px-5 py-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-content">
          <p className="mb-4 text-base font-medium text-hub-ink/58 dark:text-white/58 sm:text-lg">
            Connect the channels reps already use-starting with catering, expanding to delivery.
          </p>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#eff4fa] to-transparent dark:from-[#141d2c]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#eff4fa] to-transparent dark:from-[#141d2c]" />
            <div className="feature-marquee flex w-max items-center gap-8 pr-8 sm:gap-10">
              {repeated.map((x, i) => (
                <span
                  key={`${x.name}-${i}`}
                  className="hub-glass hover-pop inline-flex min-h-[56px] items-center gap-3 rounded-full px-6 py-2.5 text-base font-semibold text-hub-ink transition hover:border-hub-accent/40 hover:shadow-sm dark:text-white"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center text-[var(--hub-blue-deep)] dark:text-[#d8ecff]">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
                  </span>
                  {x.name}
                  <span
                    className={
                      x.note === "Live"
                        ? "rounded-full bg-hub-accent/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-hub-ink/80 dark:text-hub-ink"
                        : "text-[11px] font-semibold uppercase tracking-wide text-hub-ink/35 dark:text-white/35"
                    }
                  >
                    {x.note}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
