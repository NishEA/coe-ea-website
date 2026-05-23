/**
 * Spread 002 — Work. Design-doc §6 (six domain pillars) + §16 Pass 3
 * (forward-looking, "where you'd fit"; startup mentions are names ONLY here —
 * the metric-bearing portfolio ledger is spread 003).
 *
 * Desktop: a typographic 2×3 grid. Tablet: 2-col. Mobile: native <details>
 * accordion (Section 16 Pass 6). Pillar data is hard-coded for W2; W5 swaps
 * this for a GROQ query against `pillar` (sanity/schemas/pillar.ts).
 *
 * The "branching diagram" lives as a structural typographic grid — the Banyan
 * metaphor stays INVISIBLE (no roots / branches / fruits language; §16 Pass 4).
 */
import Link from "next/link";

type Pillar = {
  slug: string;
  name: string;
  description: string;
  acceptingApplications: boolean;
};

// TODO(W5): replace with GROQ against `pillar` (sanity/schemas/pillar.ts).
const pillars: Pillar[] = [
  {
    slug: "smart-manufacturing",
    name: "Smart Manufacturing",
    description:
      "Industry 4.0 production lines, IoT-instrumented workflows, robotics integration.",
    acceptingApplications: true,
  },
  {
    slug: "smart-energy",
    name: "Smart Energy",
    description:
      "Grid intelligence, distributed generation, energy-storage optimisation.",
    acceptingApplications: true,
  },
  {
    slug: "smart-water",
    name: "Smart Water",
    description:
      "Water-quality monitoring, leak detection, treatment automation.",
    acceptingApplications: true,
  },
  {
    slug: "smart-farming",
    name: "Smart Farming",
    description:
      "Precision agriculture, soil and crop sensing, supply-chain telemetry.",
    acceptingApplications: true,
  },
  {
    slug: "intelligent-asset-monitoring",
    name: "Intelligent Asset Monitoring",
    description:
      "Predictive maintenance, condition monitoring, asset-health analytics.",
    acceptingApplications: true,
  },
  {
    slug: "connected-transportation",
    name: "Connected Transportation",
    description: "Vehicle telematics, fleet operations, mobility platforms.",
    acceptingApplications: true,
  },
];

export function WorkSpread() {
  return (
    <section
      id="work"
      aria-label="Work — spread 002"
      className="border-b border-brand-navy/15 bg-bg-paper px-6 py-20 tablet:px-12 tablet:py-24 desktop:px-20 desktop:py-32"
    >
      <header className="mb-12 flex items-baseline justify-between tablet:mb-16">
        <span className="font-mono text-[13px] tracking-[0.18em] text-brand-cerulean">
          002 / 005
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
          Work
        </span>
      </header>

      <div className="grid grid-cols-1 items-end gap-8 tablet:grid-cols-12">
        <h2 className="font-display text-[36px] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:col-span-8 tablet:text-[52px]">
          Six capabilities. Where you&rsquo;d fit.
        </h2>
        <p className="font-body text-[17px] leading-[1.6] text-brand-navy/70 tablet:col-span-4 tablet:text-right">
          The Centre&rsquo;s six Industry&nbsp;4.0 capability domains — your
          starting surface as a founder applying in.
        </p>
      </div>

      {/* Desktop + tablet: grid. Mobile: native accordion (no JS). */}
      <ul className="mt-12 hidden gap-x-12 gap-y-14 tablet:grid tablet:grid-cols-2 desktop:mt-16 desktop:grid-cols-3">
        {pillars.map((p) => (
          <li key={p.slug}>
            <h3 className="font-display text-[24px] text-brand-navy">
              {p.name}
            </h3>
            <p className="mt-2 font-body text-[15px] leading-[1.6] text-brand-navy/70">
              {p.description}
            </p>
            {p.acceptingApplications && (
              <Link
                href={`/apply?pillar=${p.slug}`}
                className="mt-3 inline-block font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline"
              >
                Apply &rarr;
              </Link>
            )}
          </li>
        ))}
      </ul>

      <ul className="mt-10 divide-y divide-brand-navy/15 tablet:hidden">
        {pillars.map((p) => (
          <li key={p.slug}>
            <details className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between font-display text-[22px] text-brand-navy">
                {p.name}
                <span
                  aria-hidden
                  className="font-mono text-[16px] text-brand-cerulean transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 font-body text-[15px] leading-[1.6] text-brand-navy/70">
                {p.description}
              </p>
              {p.acceptingApplications && (
                <Link
                  href={`/apply?pillar=${p.slug}`}
                  className="mt-3 inline-block font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean"
                >
                  Apply &rarr;
                </Link>
              )}
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
