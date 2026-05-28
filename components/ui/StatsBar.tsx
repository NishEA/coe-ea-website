/**
 * Proof strip — sits between the Hero and Work spreads.
 *
 * Four early-credibility numbers for the founder audience. Not a spread —
 * no pagination marker. Dark bg continues the Diorama midnight seamlessly
 * before transitioning to the cream Work section.
 *
 * Values are intentionally hard-coded here (not CMS-managed) because this
 * strip is a curated editorial selection, not an exhaustive metrics table.
 * Update alongside the Sanity impactMetrics singleton at each annual review.
 */

const STATS = [
  { value: "52", label: "Startups incubated" },
  { value: "336", label: "Jobs created" },
  { value: "₹230 Cr", label: "Portfolio valuation" },
  { value: "23", label: "Patents filed" },
] as const;

export function StatsBar() {
  return (
    <div
      aria-label="Programme impact at a glance"
      className="border-b border-ice/15 bg-bg-midnight px-6 py-5 tablet:px-12 tablet:py-6 desktop:px-20"
    >
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 tablet:flex-nowrap tablet:justify-between">
        {STATS.map((s) => (
          <li key={s.label} className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="font-display text-[22px] leading-none tracking-[-0.01em] text-bg-paper tablet:text-[26px]">
              {s.value}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ice/50">
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
