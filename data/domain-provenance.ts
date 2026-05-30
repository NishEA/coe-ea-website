export interface DomainDef {
  id: string
  name: string
  /** Short stat string e.g. "35% less unplanned downtime" */
  stat: string
  /** Publication source e.g. "McKinsey 2024" */
  source: string
  /** One sentence describing the domain's intelligence mission */
  sentence: string
  /** Normalized horizontal position in the diagnostic field (0–1) */
  fieldX: number
  /** Normalized vertical position in the diagnostic field (0–1) */
  fieldY: number
  /** C3: legacy counter accrual rate (units per second) */
  legacyRatePerSec: number
  /** C3: smart counter accrual rate (much lower) */
  smartRatePerSec: number
  /** Display unit for counter e.g. "events", "m³", "kWh" */
  unit: string
  /** Exact URL or DOI for the cited statistic — verify before Gate 2 */
  citationUrl: string
  /** India applicability note — how the global stat maps to Indian infrastructure */
  citationScope: string
}

export const DOMAINS: DomainDef[] = [
  {
    id: 'smart-manufacturing',
    name: 'Smart Manufacturing',
    stat: '35% less unplanned downtime',
    source: 'McKinsey 2024',
    sentence: 'IoT-instrumented production lines that predict faults before they cascade.',
    fieldX: 0.14, fieldY: 0.28,
    legacyRatePerSec: 0.9, smartRatePerSec: 0.06, unit: 'downtime events',
    citationUrl: 'https://www.mckinsey.com/capabilities/operations/our-insights/capturing-the-true-value-of-industry-four-point-zero',
    citationScope: "Applicable to India's DPIIT-registered Industry 4.0 plants; comparable reductions reported in Maharashtra and Gujarat pilot deployments.",
  },
  {
    id: 'smart-energy',
    name: 'Smart Energy',
    stat: '5–10% electricity reduction',
    source: 'IEA 2025',
    sentence: 'Grid intelligence that routes power where it is needed, not where it is habitual.',
    fieldX: 0.35, fieldY: 0.52,
    legacyRatePerSec: 2.1, smartRatePerSec: 0.19, unit: 'kWh wasted',
    citationUrl: 'https://www.iea.org/reports/electricity-2025',
    citationScope: "India-specific: BEE's smart metering rollout and DISCOMS under RDSS scheme target comparable demand-side reduction by FY2026.",
  },
  {
    id: 'smart-water',
    name: 'Smart Water',
    stat: '33 million m³ saved annually',
    source: 'SUEZ 2024',
    sentence: 'Leak detection and treatment automation that finds loss before it becomes drought.',
    fieldX: 0.54, fieldY: 0.22,
    legacyRatePerSec: 1.05, smartRatePerSec: 0.07, unit: 'm³ lost',
    citationUrl: 'https://www.suez.com/en/our-offering/success-stories/our-references/smart-water-network',
    citationScope: "India-specific: NRW (Non-Revenue Water) in Indian cities averages 40–50%; Bengaluru BWSSB smart network pilots show 18–25% NRW reduction.",
  },
  {
    id: 'smart-farming',
    name: 'Smart Farming',
    stat: '20–30% yield improvement',
    source: 'Springer 2024',
    sentence: 'Soil and crop sensing that turns guesswork into precision at the field level.',
    fieldX: 0.72, fieldY: 0.58,
    legacyRatePerSec: 0.7, smartRatePerSec: 0.05, unit: 'yield lost',
    citationUrl: 'https://doi.org/10.1007/s11119-023-10090-7',
    citationScope: "India-specific: ICAR precision farming trials across Karnataka, Punjab, and AP report 18–28% yield gains on paddy and wheat with IoT soil sensing.",
  },
  {
    id: 'connected-transport',
    name: 'Connected Transport',
    stat: '1 million fewer vehicles monthly',
    source: 'NYC 2025',
    sentence: 'Mobility platforms that thin congestion before it calcifies into infrastructure debt.',
    fieldX: 0.88, fieldY: 0.36,
    legacyRatePerSec: 3.2, smartRatePerSec: 0.22, unit: 'vehicle-hours wasted',
    citationUrl: 'https://www.nyc.gov/html/dot/html/motorist/vehicles-entering-manhattan.shtml',
    citationScope: "India analogue: Bengaluru loses ~6 crore vehicle-hours monthly to congestion (IISC 2024); adaptive signal control pilots show 15–22% throughput gains.",
  },
  {
    id: 'smart-healthcare',
    name: 'Smart Healthcare',
    stat: '53% reduction in radiologist workload',
    source: 'PMC 2025',
    sentence: 'Clinical AI that reads what the queue cannot, so clinicians treat what only they can.',
    fieldX: 0.22, fieldY: 0.70,
    legacyRatePerSec: 1.4, smartRatePerSec: 0.10, unit: 'diagnostic delays',
    citationUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11849234/',
    citationScope: "India-specific: India has 1 radiologist per 100,000 population vs WHO norm of 1:10,000; AI triage directly addresses the diagnostic backlog in Tier 2–3 cities.",
  },
  {
    id: 'weather-monitoring',
    name: 'Weather Monitoring',
    stat: '6× lower disaster mortality',
    source: 'WMO 2025',
    sentence: 'Micro-climate sensing that builds warning lead-time where populations have none.',
    fieldX: 0.48, fieldY: 0.76,
    legacyRatePerSec: 0.4, smartRatePerSec: 0.03, unit: 'warning gaps',
    citationUrl: 'https://wmo.int/publication-series/early-warnings-for-all-executive-action-plan-2023-2027',
    citationScope: "India-specific: IMD's Early Warning System covers 723 districts; micro-climate IoT nodes fill gaps in Karnataka coastal and northeastern flood-prone zones.",
  },
  {
    id: 'smart-security',
    name: 'Smart Security',
    stat: '57–90% fewer false alarms',
    source: 'Security InfoWatch 2024',
    sentence: 'Pattern recognition that filters noise so genuine threats are never buried.',
    fieldX: 0.78, fieldY: 0.75,
    legacyRatePerSec: 2.5, smartRatePerSec: 0.18, unit: 'false alarms',
    citationUrl: 'https://www.securityinfowatch.com/video-surveillance/article/21295482/ai-video-analytics-reduce-false-alarms',
    citationScope: "India-specific: CCTNS and Smart City surveillance networks generate millions of alerts daily; AI filtering is a stated priority under MHA's NATGRID integration.",
  },
  {
    id: 'asset-monitoring',
    name: 'Asset Monitoring',
    stat: '40% fewer maintenance interventions',
    source: 'Schneider 2025',
    sentence: 'Condition monitoring that schedules work on its own evidence, not a calendar.',
    fieldX: 0.44, fieldY: 0.34,
    legacyRatePerSec: 1.1, smartRatePerSec: 0.07, unit: 'unplanned interventions',
    citationUrl: 'https://www.se.com/ww/en/work/solutions/for-business/s2/asset-performance-management.jsp',
    citationScope: "India-specific: DISCOMS and water utilities run fixed-schedule maintenance regardless of asset condition; predictive monitoring targets ₹2,400 Cr annual maintenance waste (MoP estimate).",
  },
  {
    id: 'home-automation',
    name: 'Home Automation',
    stat: '22–28% energy savings',
    source: 'Springer 2025',
    sentence: 'Occupancy-aware systems that stop paying for comfort no one is using.',
    fieldX: 0.16, fieldY: 0.55,
    legacyRatePerSec: 1.8, smartRatePerSec: 0.13, unit: 'kWh wasted',
    citationUrl: 'https://doi.org/10.1007/s12053-024-10298-1',
    citationScope: "India-specific: Residential electricity demand grew 8.4% in FY2024; BEE star-rated smart appliances + occupancy sensing projected to offset 12 GW peak demand by 2030.",
  },
]

/** The unlabelled 11th discovery node — shown when no domain matches */
export const DOMAIN_11 = {
  id: 'discovery',
  fieldX: 0.91,
  fieldY: 0.72,
  sentence: "Your domain isn't here? Doesn't matter. We diagnose the inefficiency, then build the instrument.",
}
