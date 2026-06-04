export interface ImpactMetric {
  label: string
  value: string
  source: string
}

export interface Partner {
  name: string
  logoSrc?: string
  chip?: boolean  // true = render inside a white chip (for white-background images)
}

export const IMPACT_METRICS: ImpactMetric[] = [
  { label: 'Startups selected',    value: '52',        source: 'KPI review Apr 2026' },
  { label: 'Jobs created',         value: '336',       source: 'KPI review Apr 2026' },
  { label: 'Revenue generated',    value: '₹10.35 Cr', source: 'KPI review Apr 2026' },
  { label: 'Portfolio valuation',  value: '₹230 Cr',   source: 'KPI review Apr 2026' },
  { label: 'Patents filed',        value: '23',        source: 'KPI review Apr 2026' },
  { label: 'Products & services',  value: '70',        source: 'KPI review Apr 2026' },
  { label: 'Prototypes developed', value: '127',       source: 'KPI review Apr 2026' },
  { label: 'Partners',             value: '13',        source: 'KPI review Apr 2026' },
  { label: 'Fund raised',          value: '₹5.60 Cr',  source: 'KPI review Apr 2026' },
]

export const PARTNERS: Partner[] = [
  { name: 'HPE',       logoSrc: '/logos/hpe.avif',       chip: true },
  { name: 'Intel',     logoSrc: '/logos/intel.svg' },
  { name: 'Bosch',     logoSrc: '/logos/bosch-si.svg' },
  { name: 'Schneider', logoSrc: '/logos/schneider.svg' },
]
