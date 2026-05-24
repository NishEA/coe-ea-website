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
      <footer className="border-t border-ice px-6 py-8 font-mono text-[12px] text-brand-navy/60 desktop:px-20">
        Center of Excellence — Efficiency Augmentation · An STPI initiative
      </footer>
    </>
  );
}
