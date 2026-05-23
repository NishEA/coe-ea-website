const spreads = [
  { n: "001", title: "Hero" },
  { n: "002", title: "Work" },
  { n: "003", title: "Portfolio" },
  { n: "004", title: "Apply" },
  { n: "005", title: "Impact & Partners" },
];

/** Home — the five editorial spreads (design-doc §6). Placeholders; built W2+. */
export default function HomePage() {
  return (
    <div>
      {spreads.map((s) => (
        <section
          key={s.n}
          className="flex min-h-[60vh] flex-col justify-center border-b border-ice px-6 py-24 desktop:px-20"
        >
          <span className="font-mono text-[13px] tracking-[0.06em] text-brand-cerulean">
            {s.n} / 005
          </span>
          <h2 className="mt-4 font-display text-5xl text-brand-navy">
            {s.title}
          </h2>
          <p className="mt-3 max-w-prose font-body text-brand-navy/60">
            Spread {s.n} — placeholder. Built in W2 onward.
          </p>
        </section>
      ))}
    </div>
  );
}
