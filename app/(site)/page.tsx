// Server component — no 'use client'. Client components declare their own boundary.
// FieldCanvas is loaded dynamically so the canvas RAF loop doesn't block
// hydration of the content spreads.
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { FieldProvider } from '@/components/field/FieldProvider'
import { DomainMetadata } from '@/components/field/DomainMetadata'
import { ChapterProgress } from '@/components/site/ChapterProgress'
import { TheDiagnosis } from '@/components/spreads/TheDiagnosis'
import { CredibilityBand } from '@/components/spreads/CredibilityBand'
import { TheResolve } from '@/components/spreads/TheResolve'
import { TheLedger } from '@/components/spreads/TheLedger'
import { TheInstrument } from '@/components/spreads/TheInstrument'
import { TheApplication } from '@/components/spreads/TheApplication'

// Loaded client-side only, after hydration completes (ssr:false + idle init in FieldCanvas).
const FieldCanvas = dynamic(
  () => import('@/components/field/FieldCanvas').then(m => ({ default: m.FieldCanvas })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <FieldProvider>
      <FieldCanvas />
      <DomainMetadata />
      <ChapterProgress />
      <TheDiagnosis />
      <CredibilityBand />
      <TheResolve />
      <TheLedger />
      <TheInstrument />
      <Suspense>
        <TheApplication />
      </Suspense>
    </FieldProvider>
  )
}
