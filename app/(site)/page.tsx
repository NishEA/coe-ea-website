'use client'

import { Suspense } from 'react'
import { FieldProvider } from '@/components/field/FieldProvider'
import { FieldCanvas }   from '@/components/field/FieldCanvas'
import { TheDiagnosis }   from '@/components/spreads/TheDiagnosis'
import { TheResolve }     from '@/components/spreads/TheResolve'
import { TheLedger }      from '@/components/spreads/TheLedger'
import { TheInstrument }  from '@/components/spreads/TheInstrument'
import { TheApplication } from '@/components/spreads/TheApplication'

export default function HomePage() {
  return (
    <FieldProvider>
      <FieldCanvas />
      <TheDiagnosis />
      <TheResolve />
      <TheLedger />
      <TheInstrument />
      <Suspense>
        <TheApplication />
      </Suspense>
    </FieldProvider>
  )
}
