/** Public site chrome — DESIGN.md section 8 (editorial masthead nav). The masthead
 *  itself is rendered inside individual spreads now (currently: Hero.Cover)
 *  per hero-redesign-v1.md section 3. Layout retains the footer. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <footer className="border-t border-brand-navy/15 bg-bg-paper px-6 py-10 desktop:px-20">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/80">
              Centre of Excellence — Efficiency Augmentation
            </p>
            <p className="mt-1 font-body text-[13px] leading-[1.6] text-brand-navy/50">
              An STPI initiative. Software Technology Parks of India is an
              autonomous society under MeitY, Government of India.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60"
          >
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Apply", href: "/apply" },
              { label: "Contact", href: "/#contact" },
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
