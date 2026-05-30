import type { DomainDef } from '@/data/domain-provenance'

export interface DomainCounter {
  legacyAccrued: number
  smartAccrued: number
  legacyRatePerSec: number
  smartRatePerSec: number
  unit: string
}

export function createCounter(domain: DomainDef): DomainCounter {
  return {
    legacyAccrued: 0,
    smartAccrued: 0,
    legacyRatePerSec: domain.legacyRatePerSec,
    smartRatePerSec: domain.smartRatePerSec,
    unit: domain.unit,
  }
}

/** Pure — returns new counter, does not mutate input */
export function tickCounter(counter: DomainCounter, dtSeconds: number): DomainCounter {
  return {
    ...counter,
    legacyAccrued: counter.legacyAccrued + counter.legacyRatePerSec * dtSeconds,
    smartAccrued:  counter.smartAccrued  + counter.smartRatePerSec  * dtSeconds,
  }
}

export function formatCounterValue(value: number): string {
  return value >= 100 ? Math.round(value).toString() : value.toFixed(1)
}
