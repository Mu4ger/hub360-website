"use client";

type FeatureItem = {
  label: string;
  icon: "data" | "privacy" | "timing" | "audit" | "automation" | "accuracy" | "security" | "signal";
};

const items: FeatureItem[] = [
  { label: "Data Driven", icon: "data" },
  { label: "Privacy First", icon: "privacy" },
  { label: "Context Timing", icon: "timing" },
  { label: "Audit Ready", icon: "audit" },
  { label: "Workflow Automation", icon: "automation" },
  { label: "Policy Accuracy", icon: "accuracy" },
  { label: "Enterprise Security", icon: "security" },
  { label: "Live Risk Signals", icon: "signal" },
];

function FeatureIcon({ type }: { type: FeatureItem["icon"] }) {
  switch (type) {
    case "data":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M4 15V9m6 6V5m6 10v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="4" cy="16" r="1.5" fill="currentColor"/><circle cx="10" cy="4" r="1.5" fill="currentColor"/><circle cx="16" cy="11" r="1.5" fill="currentColor"/></svg>;
    case "privacy":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M10 3l6 2.4v4.2c0 3.5-2.4 5.8-6 7.4-3.6-1.6-6-3.9-6-7.4V5.4L10 3z" stroke="currentColor" strokeWidth="1.7"/><path d="M7.7 10.1l1.6 1.6 3-3.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "timing":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><circle cx="10" cy="10" r="6.7" stroke="currentColor" strokeWidth="1.7"/><path d="M10 6.3V10l2.4 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
    case "audit":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><rect x="4" y="3.5" width="12" height="13" rx="2.3" stroke="currentColor" strokeWidth="1.7"/><path d="M7 8.2h6M7 11h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
    case "automation":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M8 3l1.6 3.2L13 8l-3.4 1.8L8 13l-1.6-3.2L3 8l3.4-1.8L8 3z" stroke="currentColor" strokeWidth="1.5"/><circle cx="14.7" cy="14.7" r="2.3" stroke="currentColor" strokeWidth="1.7"/></svg>;
    case "accuracy":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M3.8 10l3.1 3.1L16.2 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "security":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><rect x="4.2" y="9" width="11.6" height="7.2" rx="1.8" stroke="currentColor" strokeWidth="1.7"/><path d="M6.8 9V7.3A3.2 3.2 0 0110 4.1a3.2 3.2 0 013.2 3.2V9" stroke="currentColor" strokeWidth="1.7"/></svg>;
    case "signal":
      return <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M3 13.2h2.8l2.2-3.7 2.4 4.3 2.2-3h4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    default:
      return null;
  }
}

export function FeatureMarqueeBand() {
  const repeated = [...items, ...items];

  return (
    <section className="hub-ambient-bg w-full pt-8 sm:pt-10">
      <div className="hub-glass-strong relative w-full overflow-hidden rounded-none border-x-0 px-2 py-4 sm:px-3 sm:py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#eff4fa] to-transparent dark:from-[#141d2c]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#eff4fa] to-transparent dark:from-[#141d2c]" />
        <div className="feature-marquee flex w-max items-center gap-8 pr-8 sm:gap-10">
            {repeated.map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className="hub-glass hover-pop inline-flex min-h-[56px] items-center gap-3 rounded-full px-6 py-2.5 text-base font-semibold text-hub-ink dark:text-white"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center text-[var(--hub-blue-deep)] dark:text-[#d8ecff]">
                  <FeatureIcon type={item.icon} />
                </span>
                <span>{item.label}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
