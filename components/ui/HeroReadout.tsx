interface ReadoutLine {
  label: string
  value: string
}

export function HeroReadout({
  lines,
  position = 'top-right',
}: {
  lines: ReadoutLine[]
  position?: 'top-right' | 'top-left' | 'bottom-right'
}) {
  const posClass = {
    'top-right': 'top-5 right-16 tablet:top-7 tablet:right-20',
    'top-left': 'top-5 left-16 tablet:top-7 tablet:left-20',
    'bottom-right': 'bottom-10 right-16 tablet:bottom-12 tablet:right-20',
  }[position]

  return (
    <div
      className={`absolute z-20 ${posClass} hidden desktop:block`}
      aria-hidden
    >
      <div className="relative px-3 py-2">
        <span className="absolute left-0 top-0 h-[6px] w-[6px] border-l border-t border-brand-cerulean/35" />
        <span className="absolute right-0 top-0 h-[6px] w-[6px] border-r border-t border-brand-cerulean/35" />
        <span className="absolute bottom-0 left-0 h-[6px] w-[6px] border-b border-l border-brand-cerulean/35" />
        <span className="absolute bottom-0 right-0 h-[6px] w-[6px] border-b border-r border-brand-cerulean/35" />
        <div className="flex flex-col gap-[3px]">
          {lines.map((line) => (
            <div key={line.label} className="flex items-center gap-2.5">
              <span className="min-w-[64px] font-mono text-[8px] uppercase tracking-[0.18em] text-brand-ice/25">
                {line.label}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-brand-cerulean/55">
                {line.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
