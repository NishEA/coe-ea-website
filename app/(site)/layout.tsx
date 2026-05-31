import Link from "next/link";

const NAV = [
  { href: "/apply",      label: "Apply" },
  { href: "/portfolio",  label: "Portfolio" },
  { href: "/book",       label: "Book" },
  { href: "/governance", label: "Governance" },
  { href: "/events",     label: "Events" },
];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Fixed dark nav — sits above the canvas field on all pages */}
      <header
        role="banner"
        className="fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-brand-ice/10 bg-bg-midnight/80 px-6 py-4 backdrop-blur-md desktop:px-20"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-[1rem] leading-none text-brand-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
        >
          CoE-EA
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-brand-ice/50">
            An STPI Initiative
          </span>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-operational animate-pulse"
            aria-label="Centre active"
            title="Centre active"
          />
        </Link>
        <nav
          aria-label="Primary"
          className="hidden gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ice/60 tablet:flex"
        >
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-brand-cerulean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/apply"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean transition hover:text-brand-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
        >
          Apply →
        </Link>
      </header>

      {/* pt-14 clears the fixed nav height */}
      <main className="relative z-10 pt-14">{children}</main>
      <footer className="relative z-10 border-t border-brand-navy/15 bg-bg-paper px-6 py-10 desktop:px-20">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/80">
              Centre of Excellence — Efficiency Augmentation
            </p>
            <p className="mt-1 font-body text-[13px] leading-[1.6] text-brand-navy/50">
              Funded by KITS · STPI · HPE. Software Technology Parks of India
              is an autonomous society under MeitY, Government of India.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60"
          >
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Apply", href: "/apply" },
              { label: "Contact", href: "/#instrument" },
              { label: "STPI", href: "https://www.stpi.in" },
              { label: "RTI", href: "https://www.stpi.in/rti.html" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="transition hover:text-brand-cerulean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                {...(l.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
