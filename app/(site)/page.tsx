// Server component — no 'use client'. Client components declare their own boundary.
import { Suspense } from 'react'
import { FieldProvider } from '@/components/field/FieldProvider'
import { FieldCanvasLoader } from '@/components/field/FieldCanvasLoader'
import { DomainMetadata } from '@/components/field/DomainMetadata'
import { ChapterProgress } from '@/components/site/ChapterProgress'
import { TheDiagnosis } from '@/components/spreads/TheDiagnosis'
import { CredibilityBand } from '@/components/spreads/CredibilityBand'
import { TheResolve } from '@/components/spreads/TheResolve'
import { TheLedger } from '@/components/spreads/TheLedger'
import { TheInstrument } from '@/components/spreads/TheInstrument'
import { TheApplication } from '@/components/spreads/TheApplication'

export default function HomePage() {
  return (
    <FieldProvider>
      <FieldCanvasLoader />
      <DomainMetadata />
      <ChapterProgress />
      <TheDiagnosis />
      <CredibilityBand />
      <TheResolve />
      <TheInstrument />
      <TheLedger />
      <div className="h-px bg-brand-cerulean" aria-hidden="true" />
      <Suspense>
        <TheApplication />
      </Suspense>
    </FieldProvider>
  )
}
