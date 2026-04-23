type FooterLink = { href: string; label: string; external?: boolean };

type FooterCol = { title: string; links: FooterLink[] };

const cols: FooterCol[] = [
  {
    title: "Product",
    links: [
      { href: "#platform", label: "Platform" },
      { href: "#compliance-tool", label: "Compliance map" },
      { href: "#why", label: "Why it matters" },
      { href: "#contact", label: "Request demo" },
    ],
  },
  {
    title: "Compliance",
    links: [
      {
        href: "https://openpaymentsdata.cms.gov/",
        label: "Open Payments data",
        external: true,
      },
      {
        href: "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-D/part-180",
        label: "45 CFR Part 180",
        external: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#contact", label: "Contact" },
      { href: "#", label: "Security overview" },
      { href: "#", label: "Privacy" },
    ],
  },
  {
    title: "Connect",
    links: [{ href: "https://www.linkedin.com/", label: "LinkedIn", external: true }],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hub-ink/[0.06] bg-white/90 px-5 py-16 backdrop-blur-sm dark:border-white/10 dark:bg-[#0b0f14]/90 sm:px-8">
      <div className="mx-auto grid w-full max-w-content gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <p className="flex items-center gap-2 text-sm font-semibold text-hub-ink dark:text-white">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-hub-ink text-[11px] font-bold text-white dark:bg-hub-accent dark:text-hub-ink">
              H
            </span>
            HUB360
          </p>
          <p className="mt-4 text-xs leading-relaxed text-hub-ink/45 dark:text-white/40">
            © 2026 HUB360. Map and tables use placeholder fields until you connect CMS and policy
            sources.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hub-ink/40 dark:text-white/40">
              {c.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="text-sm text-hub-ink/55 transition hover:text-hub-ink dark:text-white/50 dark:hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
