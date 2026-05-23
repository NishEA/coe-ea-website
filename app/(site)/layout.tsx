import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Apply" },
  { href: "/book", label: "Book" },
  { href: "/governance", label: "Governance" },
  { href: "/events", label: "Events" },
];

/** Public site chrome — DESIGN.md §8 (editorial masthead nav). Placeholder. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex items-center justify-between border-b border-ice px-6 py-4 desktop:px-20">
        <Link href="/" className="font-display text-lg text-brand-navy">
          CoE-EA
          <span className="ml-2 font-mono text-[11px] tracking-[0.18em] text-brand-navy/60">
            AN STPI INITIATIVE
          </span>
        </Link>
        <nav className="flex gap-6 font-body text-[13px] uppercase tracking-[0.18em] text-brand-navy">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-brand-cerulean"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-ice px-6 py-8 font-mono text-[12px] text-brand-navy/60 desktop:px-20">
        Center of Excellence — Efficiency Augmentation · An STPI initiative
      </footer>
    </>
  );
}
