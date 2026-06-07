// Server component — no 'use client'. Client components declare their own boundary.
import { Suspense } from 'react'
import { ChapterProgress } from '@/components/site/ChapterProgress'
import { TheDiagnosis } from '@/components/spreads/TheDiagnosis'
import { CredibilityBand } from '@/components/spreads/CredibilityBand'
import { TheResolve } from '@/components/spreads/TheResolve'
import { TheInstrument } from '@/components/spreads/TheInstrument'
import { TheLedger } from '@/components/spreads/TheLedger'
import { TheApplication } from '@/components/spreads/TheApplication'
import { getImpactMetrics, getPartners, getApplyBenefits } from '@/lib/sanity/fetchers'

export default async function HomePage() {
  const [metrics, partners, benefits] = await Promise.all([
    getImpactMetrics(),
    getPartners(),
    getApplyBenefits(),
  ])

  return (
    <>
      <ChapterProgress />
      <TheDiagnosis />
      <CredibilityBand />
      <TheResolve />
      <TheInstrument />
      <div className="h-px bg-brand-cerulean" aria-hidden="true" />
      <TheLedger metrics={metrics} partners={partners} />
      <div className="h-px bg-brand-cerulean" aria-hidden="true" />
      <Suspense>
        <TheApplication benefits={benefits} />
      </Suspense>
    </>
  )
}
