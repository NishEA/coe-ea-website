export interface DomainDef {
  id: string
  name: string
  /** Slug used as the form submission value in the apply form */
  formValue: string
  /** Abbreviated label for OrbitCanvas nodes */
  orbitLabel: string
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
  /** Exact URL or DOI for the cited statistic — verified live */
  citationUrl: string
  /** India applicability note — how the global stat maps to Indian infrastructure */
  citationScope: string
  /** Condensed stat for the metadata overlay e.g. "33M m³ SAVED" */
  shortStat: string
}

export const DOMAINS: DomainDef[] = [
  {
    id: 'smart-manufacturing',
    name: 'Smart Manufacturing',
    formValue: 'smart_manufacturing',
    orbitLabel: 'MFG',
    stat: '35% less unplanned downtime',
    source: 'McKinsey 2024',
    sentence: 'IoT-instrumented production lines that predict faults before they cascade.',
    fieldX: 0.14, fieldY: 0.28,
    legacyRatePerSec: 0.9, smartRatePerSec: 0.06, unit: 'downtime events',
    citationUrl: 'https://www.mckinsey.com/capabilities/operations/our-insights/capturing-the-true-value-of-industry-four-point-zero',
    citationScope: "Applicable to India's DPIIT-registered Industry 4.0 plants; comparable reductions reported in Maharashtra and Gujarat pilot deployments.",
    shortStat: '35% LESS DOWNTIME',
  },
  {
    id: 'smart-energy',
    name: 'Smart Energy',
    formValue: 'smart_energy',
    orbitLabel: 'ENERGY',
    stat: '5–10% electricity reduction',
    source: 'IEA 2025',
    sentence: 'Grid intelligence that routes power where it is needed, not where it is habitual.',
    fieldX: 0.35, fieldY: 0.52,
    legacyRatePerSec: 2.1, smartRatePerSec: 0.19, unit: 'kWh wasted',
    citationUrl: 'https://www.iea.org/reports/electricity-2025',
    citationScope: "India-specific: BEE's smart metering rollout and DISCOMS under RDSS scheme target comparable demand-side reduction by FY2026.",
    shortStat: '5–10% LESS ELECTRICITY',
  },
  {
    id: 'smart-water',
    name: 'Smart Water',
    formValue: 'smart_water',
    orbitLabel: 'WATER',
    stat: 'NRW cut from 38% to 15% in India Smart Cities pilot',
    source: 'Smart Utilities India 2025',
    sentence: 'Leak detection and smart metering that finds loss before it becomes a deficit.',
    fieldX: 0.54, fieldY: 0.22,
    legacyRatePerSec: 1.05, smartRatePerSec: 0.07, unit: 'm³ lost',
    citationUrl: 'https://smartutilities.net.in/2025/06/15/minimising-wastage-measures-to-reduce-nrw-levels-in-cities/',
    citationScope: "India-specific: Panaji Smart Cities Mission pilot reduced NRW from 38% to 15% using IoT meters and SCADA. AMRUT 2.0 targets NRW below 20% nationwide; BWSSB Bengaluru reduced UFW from 48% (2007) to 30% (2024).",
    shortStat: '38→15% NRW CUT',
  },
  {
    id: 'smart-farming',
    name: 'Smart Farming',
    formValue: 'smart_farming',
    orbitLabel: 'FARMING',
    stat: 'up to 30% yield increase from IoT precision irrigation',
    source: 'Springer Nature 2025',
    sentence: 'Soil and crop sensing that turns guesswork into precision at the field level.',
    fieldX: 0.72, fieldY: 0.58,
    legacyRatePerSec: 0.7, smartRatePerSec: 0.05, unit: 'yield lost',
    citationUrl: 'https://link.springer.com/article/10.1007/s44279-025-00430-1',
    citationScope: "India-specific: Microsoft AI-driven IoT irrigation pilot in Andhra Pradesh achieved 30% yield increase and 70% water savings (Springer Nature 2025). ICAR precision farming trials across Karnataka, Punjab, and AP report comparable gains on paddy and wheat. Digital Agriculture Mission targets AI-IoT coverage for 7.63 crore farmer IDs.",
    shortStat: 'UP TO 30% MORE YIELD',
  },
  {
    id: 'connected-transport',
    name: 'Connected Transport',
    formValue: 'connected_transportation',
    orbitLabel: 'TRNSPRT',
    stat: '20–33% travel time reduction from AI signals',
    source: 'Bengaluru Traffic Police 2024',
    sentence: 'Adaptive signal control that dissolves congestion before it calcifies into infrastructure debt.',
    fieldX: 0.88, fieldY: 0.36,
    legacyRatePerSec: 3.2, smartRatePerSec: 0.22, unit: 'vehicle-hours wasted',
    citationUrl: 'https://www.moneycontrol.com/news/business/ai-powered-signals-reduce-travel-time-by-20-33-across-three-road-sections-bengaluru-traffic-police-12839064.html',
    citationScope: "India-specific: Bengaluru ATCS (165 junctions) achieved 20–33% travel time reduction on KR Road, Hudson Circle, and Jayanagar corridors using C-DAC's CoSiCoSt AI system, reported by Bengaluru Traffic Police (Oct 2024).",
    shortStat: '20–33% LESS TRAVEL TIME',
  },
  {
    id: 'smart-healthcare',
    name: 'Smart Healthcare',
    formValue: 'smart_hospital',
    orbitLabel: 'HEALTH',
    stat: 'up to 36% reduction in radiology reporting workload',
    source: 'European Radiology 2024',
    sentence: 'Clinical AI that reads what the queue cannot, so clinicians treat what only they can.',
    fieldX: 0.22, fieldY: 0.70,
    legacyRatePerSec: 1.4, smartRatePerSec: 0.10, unit: 'diagnostic delays',
    citationUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11519193/',
    citationScope: "India-specific: India has 1 radiologist per 100,000 population vs WHO norm of 1:10,000; AI triage directly addresses the diagnostic backlog in Tier 2–3 cities where normal chest X-rays form the majority of reporting load.",
    shortStat: '36% LESS REPORTING LOAD',
  },
  {
    id: 'weather-monitoring',
    name: 'Weather Monitoring',
    formValue: 'weather_monitoring',
    orbitLabel: 'WEATHER',
    stat: '6× lower disaster mortality with early warning systems',
    source: 'UNDRR 2024',
    sentence: 'Micro-climate sensing that builds warning lead-time where populations have none.',
    fieldX: 0.48, fieldY: 0.76,
    legacyRatePerSec: 0.4, smartRatePerSec: 0.03, unit: 'warning gaps',
    citationUrl: 'https://www.undrr.org/reports/global-status-MHEWS-2024',
    citationScope: "India-specific: IMD's Early Warning System covers 723 districts; micro-climate IoT nodes fill gaps in Karnataka coastal and northeastern flood-prone zones. Countries without multi-hazard EWS have 6× higher disaster mortality (UNDRR/WMO 2024).",
    shortStat: '6× LESS MORTALITY',
  },
  {
    id: 'smart-security',
    name: 'Smart Security',
    formValue: 'smart_security',
    orbitLabel: 'SECURITY',
    stat: 'up to 90% fewer false alarms from AI video analytics',
    source: 'Lumana AI 2025',
    sentence: 'Pattern recognition that filters noise so genuine threats are never buried.',
    fieldX: 0.78, fieldY: 0.75,
    legacyRatePerSec: 2.5, smartRatePerSec: 0.18, unit: 'false alarms',
    citationUrl: 'https://www.lumana.ai/blog/how-ai-powered-video-analytics-cut-false-alarms-by-up-to-90',
    citationScope: "India-specific: CCTNS and Smart City surveillance networks generate millions of alerts daily; AI filtering is a stated priority under MHA's NATGRID integration. Up to 90% false alarm reduction frees security personnel for genuine threat response.",
    shortStat: 'UP TO 90% FEWER ALARMS',
  },
  {
    id: 'asset-monitoring',
    name: 'Asset Monitoring',
    formValue: 'intelligent_asset_monitoring',
    orbitLabel: 'ASSETS',
    stat: '30% reduction in maintenance costs and downtime',
    source: 'McKinsey 2021',
    sentence: 'Condition monitoring that schedules work on its own evidence, not a calendar.',
    fieldX: 0.44, fieldY: 0.34,
    legacyRatePerSec: 1.1, smartRatePerSec: 0.07, unit: 'unplanned interventions',
    citationUrl: 'https://www.mckinsey.com/capabilities/operations/our-insights/establishing-the-right-analytics-based-maintenance-strategy',
    citationScope: "India-specific: DISCOMS and water utilities run fixed-schedule maintenance regardless of asset condition; IoT-based condition monitoring can reduce maintenance-related costs and downtime by 30% (McKinsey analytics-based maintenance study).",
    shortStat: '30% LESS MAINTENANCE',
  },
  {
    id: 'home-automation',
    name: 'Home Automation',
    formValue: 'home_office_automation',
    orbitLabel: 'HOME',
    stat: '20–30% reduction in cooling-related electricity demand',
    source: 'BEE India 2026',
    sentence: 'Occupancy-aware systems that stop paying for comfort no one is using.',
    fieldX: 0.16, fieldY: 0.55,
    legacyRatePerSec: 1.8, smartRatePerSec: 0.13, unit: 'kWh wasted',
    citationUrl: 'https://www.thehindubusinessline.com/economy/bee-showcases-indias-low-energy-housing-model-in-baku-amid-energy-conservation-push/article70993258.ece',
    citationScope: "India-specific: BEE estimates homes built to ENS 2024 standards reduce cooling-related electricity demand by 20–30%. Air-conditioner penetration projected to rise from 8% to 40% of households by 2035, making smart building controls a national priority.",
    shortStat: '20–30% LESS COOLING ENERGY',
  },
]

/** The unlabelled 11th discovery node — shown when no domain matches */
export const DOMAIN_11 = {
  id: 'discovery',
  fieldX: 0.91,
  fieldY: 0.72,
  sentence: "Your domain isn't here? Doesn't matter. We diagnose the inefficiency, then build the instrument.",
}
