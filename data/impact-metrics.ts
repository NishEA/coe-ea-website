export interface ImpactMetric {
  label: string
  value: string
  source: string
}

export interface Partner {
  name: string
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
  { name: 'HPE' },
  { name: 'Intel' },
  { name: 'Bosch' },
  { name: 'Schneider' },
  { name: 'MathWorks' },
]
