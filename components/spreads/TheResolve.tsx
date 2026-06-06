export function TheResolve() {
  return (
    <section
      id="resolve"
      aria-label="The Shift — Indian industry before and after instrumentation"
      className="relative w-full px-8 pb-24 pt-24 tablet:px-16"
    >
      <div className="mb-12 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean">The Shift</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ice/40">Before · After</p>
      </div>
      <p className="mb-12 font-mono text-[13px] leading-relaxed tracking-[0.06em] text-brand-ice">
        Two states of the same infrastructure — instinct, then instrumentation.
      </p>
      <div className="grid grid-cols-1 gap-px border border-brand-ice/10 bg-brand-ice/10 tablet:grid-cols-[1fr_1px_1fr]">
        <div className="bg-bg-midnight p-8 [background:radial-gradient(120%_120%_at_0_50%,rgba(224,137,74,.08),transparent_60%)]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-legacy">Before — Legacy state</p>
          <p className="font-display text-[1.5rem] font-light leading-[1.15] text-legacy-warm tablet:text-[1.85rem]">
            Indian industry runs on instinct: fixed-schedule maintenance, blind grids, 38% water lost to leaks no one can see.
          </p>
        </div>
        <div aria-hidden className="hidden bg-gradient-to-b from-transparent via-brand-cerulean/40 to-transparent tablet:block" />
        <div className="bg-bg-midnight p-8 text-right [background:radial-gradient(120%_120%_at_100%_50%,rgba(0,164,228,.10),transparent_60%)]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cerulean">After — Instrumented</p>
          <p className="font-display text-[1.5rem] font-light leading-[1.15] text-resolve-cool tablet:text-[1.85rem]">
            CoE-EA turns that signal into measured efficiency — every claim bound to a citation, every domain diagnosed.
          </p>
        </div>
      </div>
    </section>
  )
}
