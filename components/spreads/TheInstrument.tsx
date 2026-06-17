'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

const ELIGIBILITY = [
  'Incorporated or registrable entity founded in the last 5 years.',
  "Working on a problem within one of the Centre's ten Industry 4.0 domains.",
  'Majority Indian shareholding. Foreign nationals may co-found but the lead founder must be an Indian citizen.',
  'No prior or current incubation at another STPI Centre of Excellence during the application period.',
  'Not receiving concurrent GoI incubation grants exceeding ₹5L at time of application.',
  'Karnataka registration is preferred but not mandatory. Outstation startups may be considered subject to willingness to operate from the Bengaluru Centre during the incubation term.',
  'DPIIT recognition is not required at application; it is encouraged before onboarding.',
]

export function TheInstrument() {
  // IntersectionObserver for SVG border draw
  const cardRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  // IntersectionObserver for eligibility list stagger
  const eligibilityRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const cardEl = cardRef.current
    if (!cardEl) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(cardEl)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const listEl = eligibilityRef.current
    if (!listEl) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          listEl.setAttribute('data-visible', 'true')
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(listEl)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Seam hairline: 1px cerulean at the dark/cream boundary */}
      <div className="h-px bg-brand-cerulean" aria-hidden="true" />
      <section
        id="instrument"
        aria-label="The Instrument — about the Centre of Excellence"
        className="relative w-full blueprint-grid bg-bg-paper px-6 py-24 tablet:px-12 desktop:px-20"
      >
        {/* Corner tick marks — precision framing */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-brand-navy/[0.12]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-brand-navy/[0.12]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-brand-navy/[0.12]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-brand-navy/[0.12]"
        />

        {/* Section header */}
        <header className="mb-16 flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-cerulean">
            The Centre
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            STPI · KITS · HPE
          </span>
        </header>

        {/* Institutional identity + contact */}
        <div className="mb-16 border-b border-brand-navy/15 pb-16">
          <div className="grid grid-cols-1 items-start gap-12 tablet:grid-cols-12">
            <div className="tablet:col-span-7">
              <h2 className="font-display text-[2rem] font-light leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:text-[3rem]">
                Who runs the Centre.
              </h2>
              <p className="mt-6 font-body text-[17px] leading-[1.6] text-ink/85">
                The Centre of Excellence on Efficiency Augmentation (CoE-EA) is jointly funded by{' '}
                <strong className="font-semibold text-brand-navy">Software Technology Parks of India (STPI)</strong>,{' '}
                <strong className="font-semibold text-brand-navy">Karnataka Innovation &amp; Technology Society (KITS)</strong>,
                Government of Karnataka, and{' '}
                <strong className="font-semibold text-brand-navy">Hewlett Packard Enterprise (HPE)</strong>.
                STPI is the implementing agency and an autonomous society under MeitY, Government of India.
              </p>
              <p className="mt-4 font-body text-[15px] leading-[1.6] text-ink/75">
                We instrument, diagnose, and augment infrastructure across ten domains. The work does not
                end when the instrument is built — it ends when the system no longer needs us.
              </p>
            </div>

            <div className="tablet:col-span-5">
              {/* Self-drawing SVG border card */}
              <div ref={cardRef} className="relative p-8">
                {/* Programme Contact badge */}
                <span className="glass-chip px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean absolute top-4 left-4">
                  Programme Contact
                </span>

                {/* Self-drawing SVG border */}
                <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                  <rect
                    x="0.5" y="0.5"
                    width="calc(100% - 1px)" height="calc(100% - 1px)"
                    fill="none"
                    stroke="rgba(14,45,122,0.25)"
                    strokeWidth="1"
                    style={{
                      strokeDasharray: '999',
                      strokeDashoffset: inView ? '0' : '999',
                      transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s',
                    }}
                  />
                </svg>

                {/* Corner dimension tick — top right */}
                <div className="absolute -top-2 right-8 font-mono text-[8px] tracking-[0.14em] text-brand-cerulean/50 uppercase">
                  ← 16,000 SQ FT →
                </div>

                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Email</dt>
                    <dd className="mt-1 font-body text-[15px] text-brand-navy">
                      <a href="mailto:blr.coeea@stpi.in" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean">
                        blr.coeea@stpi.in
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Address</dt>
                    <dd className="mt-1 font-body text-[15px] leading-[1.6] text-brand-navy">
                      No. 4, 1st Floor, 31st Cross<br />
                      11th Main Road, 4th T Block<br />
                      Jayanagar, Bengaluru – 560 011<br />
                      Karnataka, India
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">Phone</dt>
                    <dd className="mt-1 font-body text-[15px] text-brand-navy">
                      <a href="tel:+918024411785" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean">
                        +91–80–2441–1785
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility — slim summary; full detail on /startup-program */}
        <div className="mb-16 border-b border-brand-navy/15 pb-16">
          <div className="grid grid-cols-1 items-start gap-8 tablet:grid-cols-12">
            <h3 className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.01em] text-brand-navy tablet:col-span-4 tablet:text-[2.25rem]">
              Who can apply.
            </h3>
            <div className="tablet:col-span-7 tablet:col-start-6">
              <ul ref={eligibilityRef} className="space-y-2">
                {ELIGIBILITY.slice(0, 3).map((c, i) => (
                  <li
                    key={c}
                    className="materialise flex items-start gap-3 font-body text-[15px] leading-[1.6] text-ink/85"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <span
                      aria-hidden
                      className="font-mono text-brand-cerulean transition-transform duration-200 hover:translate-x-1"
                    >
                      →
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <Link
                href="/startup-program"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
              >
                Full eligibility + how selection works →
              </Link>
            </div>
          </div>
        </div>

        {/* Institutional links */}
        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
            Institutional links
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'STPI India',         href: 'https://www.stpi.in' },
              { label: 'MeitY',              href: 'https://www.meity.gov.in' },
              { label: 'Karnataka IT/BT/ST', href: 'https://itbt.karnataka.gov.in' },
              { label: 'Privacy notice',     href: '/privacy' },
              { label: 'RTI / Grievance',    href: 'https://www.stpi.in/rti.html' },
            ].map(l => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-cerulean hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cerulean"
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
