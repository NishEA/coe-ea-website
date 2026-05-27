import { HeroSpread } from "@/components/spreads/Hero";
import { PortfolioSpread } from "@/components/spreads/Portfolio";
import { WorkSpread } from "@/components/spreads/Work";
import { ApplySpread } from "@/components/spreads/Apply";

/** The five-spread editorial home. 001–004 built; 005 follows. */
const remaining = [
  {
    n: "005",
    id: "impact",
    title: "Impact & Partners",
    note: "Audited impact figures + partner logo band. Built W5.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSpread />
      <WorkSpread />
      <PortfolioSpread />
      <ApplySpread />
      {remaining.map((s) => (
        <section
          key={s.n}
          id={s.id}
          className="flex min-h-[60vh] flex-col justify-center border-b border-brand-navy/15 bg-bg-paper px-6 py-24 tablet:px-12 desktop:px-20"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[13px] tracking-[0.18em] text-brand-cerulean">
              {s.n} / 005
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-navy/60">
              {s.title}
            </span>
          </div>
          <h2 className="mt-8 font-display text-[36px] text-brand-navy tablet:text-[52px]">
            {s.title}
          </h2>
          <p className="mt-3 max-w-prose font-body text-brand-navy/60">
            Spread {s.n} — placeholder. {s.note}
          </p>
        </section>
      ))}
    </>
  );
}
