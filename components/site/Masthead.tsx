import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply" },
  { href: "/book", label: "Book" },
  { href: "/governance", label: "Governance" },
  { href: "/events", label: "Events" },
];

/**
 * Solid-cream editorial masthead. Used inside individual spreads that need
 * a masthead (currently: Hero.Cover). Not rendered globally by layout.tsx
 * because subsequent spreads have their own visual treatment.
 *
 * Per hero-redesign-v1.md section 3 — extracted from app/(site)/layout.tsx
 * so the hero can own its own masthead inside the Cover section.
 */
export function Masthead() {
  return (
    <header
      role="banner"
      className="flex items-center justify-between border-b border-brand-navy/10 px-6 py-4 desktop:px-20"
    >
      <Link href="/" className="font-display text-lg text-brand-navy">
        CoE-EA
        <span className="ml-2 font-mono text-[11px] tracking-[0.18em] text-brand-navy/60">
          AN STPI INITIATIVE
        </span>
      </Link>
      <nav
        aria-label="Primary"
        className="hidden gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/75 tablet:flex"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-b border-transparent pb-1 transition hover:border-brand-cerulean hover:text-brand-navy"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <span className="font-mono text-[10px] tracking-[0.18em] text-brand-navy/55">
        EN · हिं
      </span>
    </header>
  );
}
