/**
 * Spread 003 — Portfolio ledger. Design-doc §6 (six incubated startups)
 * + §16 Pass 1 (editorial ledger, not a card grid).
 *
 * One featured venture (large typographic block + portrait placeholder),
 * then five compact metric-first proof rows. Metric number is the largest
 * element in each proof row.
 *
 * Alumni rows render at reduced opacity; null metrics are hidden (never
 * shown as zero or dash). Missing portrait → single-initial typographic
 * treatment. Degrades to 4 rows if two startups are slow on content.
 *
 * TODO(W5): replace hard-coded data with GROQ against `startup` schema.
 */

type Startup = {
  slug: string;
  name: string;
  domain: string;
  whatTheyBuild: string;
  metric?: { value: string; label: string };
  status: "active" | "alumni";
};

// TODO(W5): replace with GROQ against `startup` (sanity/schemas/startup.ts).
const startups: Startup[] = [
  {
    slug: "waterbot",
    name: "WaterBot Online Solutions",
    domain: "Smart Manufacturing · Home & Office Automation",
    whatTheyBuild:
      "IoT-native water management — real-time monitoring, leak detection, and treatment automation for industrial and residential estates.",
    metric: { value: "₹50.9L", label: "raised" },
    status: "active",
  },
  {
    slug: "yappes",
    name: "Yappes Technologies",
    domain: "Intelligent Asset Monitoring",
    whatTheyBuild:
      "API-driven asset intelligence — connecting industrial sensors to decision systems without bespoke middleware.",
    status: "active",
  },
  {
    slug: "ouranos",
    name: "Ouranos Robotics",
    domain: "Smart Water · Smart Farming",
    whatTheyBuild:
      "Autonomous inspection robots for water bodies and precision agriculture.",
    metric: { value: "₹25L", label: "raised" },
    status: "active",
  },
  {
    slug: "vaticinari",
    name: "Vaticinari Technologies",
    domain: "Smart Manufacturing",
    whatTheyBuild:
      "Predictive anomaly detection for production lines — catching failures before they become downtime.",
    metric: { value: "₹4L", label: "raised" },
    status: "active",
  },
  {
    slug: "stglabs",
    name: "STG Labs India",
    domain: "Intelligent Asset Monitoring · Smart Manufacturing",
    whatTheyBuild:
      "Embedded systems and software for asset health — from single machines to multi-site industrial networks.",
    status: "active",
  },
  {
    slug: "avatarbot",
    name: "Avatarbot",
    domain: "Smart Energy · Smart Farming",
    whatTheyBuild:
      "Energy-intelligent automation for urban farming and commercial buildings.",
    status: "active",
  },
];

export function PortfolioSpread() {
  if (startups.length === 0) return null;
  const [featured, ...rest] = startups;

  return (
    <section
      id="portfolio"
      aria-label="Portfolio — spread 003"
      className="border-b border-ice/20 bg-bg-midnight px-6 py-20 tablet:px-12 tablet:py-24 desktop:px-20 desktop:py-32"
    >
      {/* Spread header */}
      <header className="mb-12 flex items-baseline justify-between tablet:mb-16">
        <span className="font-mono text-[13px] tracking-[0.18em] text-brand-cerulean">
          003 / 005
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bg-paper/60">
          Portfolio
        </span>
      </header>

      {/* Section headline */}
      <div className="mb-16 grid grid-cols-1 items-end gap-8 tablet:mb-20 tablet:grid-cols-12">
        <h2 className="font-display text-[36px] leading-[1.1] tracking-[-0.01em] text-bg-paper tablet:col-span-7 tablet:text-[52px]">
          Who&rsquo;s already here.
        </h2>
        <p className="font-body text-[17px] leading-[1.6] text-bg-paper/70 tablet:col-span-5 tablet:text-right">
          Six ventures supported by the Centre from prototype to pilot.
        </p>
      </div>

      {/* Featured startup — large typographic treatment */}
      <div className="border-t border-ice/20 pt-12 tablet:grid tablet:grid-cols-12 tablet:gap-x-12 tablet:pt-16">
        {/* Text side */}
        <div className="tablet:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">
            {featured.domain}
          </span>
          <h3 className="mt-3 font-display text-[32px] leading-[1.05] tracking-[-0.01em] text-bg-paper tablet:text-[44px]">
            {featured.name}
          </h3>
          <p className="mt-4 font-body text-[17px] leading-[1.7] text-bg-paper/70 tablet:max-w-[44ch]">
            {featured.whatTheyBuild}
          </p>
          {featured.metric && (
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-[56px] leading-none tracking-[-0.02em] text-accent-spark tablet:text-[72px]">
                {featured.metric.value}
              </span>
              <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-bg-paper/60">
                {featured.metric.label}
              </span>
            </div>
          )}
        </div>

        {/* Portrait placeholder — replaced W5 when founder photos arrive */}
        <div
          aria-hidden
          className="mt-10 flex aspect-[3/4] max-h-80 items-center justify-center border border-ice/20 tablet:col-span-5 tablet:mt-0 tablet:max-h-none"
        >
          <span className="select-none font-display text-[96px] leading-none text-bg-paper/20">
            {featured.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Proof rows — remaining startups */}
      <ul className="mt-4 divide-y divide-ice/15">
        {rest.map((s) => (
          <li
            key={s.slug}
            className="py-8 tablet:grid tablet:grid-cols-12 tablet:items-center tablet:gap-x-12"
          >
            {/* Name + domain — alumni gets lower-emphasis tokens directly (not parent opacity,
                which would compound with child opacity values and break contrast) */}
            <div className="tablet:col-span-5">
              <h3
                className={`font-display text-[22px] leading-tight tablet:text-[28px] ${
                  s.status === "alumni" ? "text-bg-paper/50" : "text-bg-paper"
                }`}
              >
                {s.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bg-paper/50">
                {s.domain}
              </p>
              {s.status === "alumni" && (
                <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-bg-paper/50">
                  Alumni
                </span>
              )}
            </div>

            {/* What they build */}
            <p
              className={`mt-3 font-body text-[15px] leading-[1.6] tablet:col-span-4 tablet:mt-0 ${
                s.status === "alumni" ? "text-bg-paper/40" : "text-bg-paper/60"
              }`}
            >
              {s.whatTheyBuild}
            </p>

            {/* Metric — hidden when null */}
            {s.metric ? (
              <div className="mt-4 tablet:col-span-3 tablet:mt-0 tablet:text-right">
                <span
                  className={`font-display text-[36px] leading-none tracking-[-0.02em] tablet:text-[44px] ${
                    s.status === "alumni" ? "text-bg-paper/50" : "text-accent-spark"
                  }`}
                >
                  {s.metric.value}
                </span>
                <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bg-paper/50">
                  {s.metric.label}
                </span>
              </div>
            ) : (
              <div className="tablet:col-span-3" />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
