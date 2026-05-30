export function TheInstrument() {
  return (
    <section
      id="instrument"
      aria-label="The Instrument — about the Centre of Excellence"
      className="relative flex min-h-dvh w-full flex-col justify-center px-8 py-24 tablet:px-16"
    >
      <div className="max-w-lg">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-cerulean">
          004 / 005
        </p>
        <h2 className="mb-6 font-display text-[2rem] font-light leading-[1.15] tracking-[-0.01em] text-brand-paper tablet:text-[2.8rem]">
          Centre of Excellence<br />on Efficiency Augmentation
        </h2>
        <p className="mb-4 font-body text-[15px] leading-[1.7] text-brand-ice/70">
          Funded by KITS, STPI, and HPE. Operated under the Software Technology
          Parks of India — an autonomous society under MeitY, Government of India.
        </p>
        <p className="font-body text-[15px] leading-[1.7] text-brand-ice/50">
          We instrument, diagnose, and augment infrastructure across ten domains.
          The work does not end when the instrument is built — it ends when the
          system no longer needs us.
        </p>
      </div>
    </section>
  )
}
