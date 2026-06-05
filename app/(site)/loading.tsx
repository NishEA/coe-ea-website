import Image from 'next/image'

export default function Loading() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-bg-void"
    >
      <Image
        src="/logos/coe-ea.png"
        alt=""
        width={140}
        height={52}
        className="splash-logo h-16 w-auto object-contain brightness-0 invert"
        style={{ animation: 'splashPulse 1.8s ease-in-out infinite' }}
        priority
      />
      <div className="flex gap-2">
        <span className="splash-dot h-1.5 w-1.5 rounded-full bg-brand-cerulean" style={{ animation: 'splashDot 1.2s ease-in-out infinite' }} />
        <span className="splash-dot h-1.5 w-1.5 rounded-full bg-brand-cerulean" style={{ animation: 'splashDot 1.2s ease-in-out 0.2s infinite' }} />
        <span className="splash-dot h-1.5 w-1.5 rounded-full bg-brand-cerulean" style={{ animation: 'splashDot 1.2s ease-in-out 0.4s infinite' }} />
      </div>
    </div>
  )
}
