/**
 * Seed all hardcoded site content into Sanity.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/seed-sanity.ts
 *
 * Get a write token: sanity.io/manage → project ifz5t0sc → API → Tokens → Add API token (Editor role)
 *
 * Safe to re-run — uses createOrReplace with deterministic _id keys so no duplicates.
 */
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'ifz5t0sc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// ── Impact metrics singleton ──────────────────────────────────────────────────

const impactMetrics = {
  _type: 'impactMetrics',
  _id: 'impactMetrics-singleton',
  metrics: [
    { _key: 'startups-selected',    label: 'Startups selected',    value: '52',        source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'jobs-created',         label: 'Jobs created',         value: '336',       source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'revenue-generated',    label: 'Revenue generated',    value: '₹10.35 Cr', source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'portfolio-valuation',  label: 'Portfolio valuation',  value: '₹230 Cr',   source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'patents-filed',        label: 'Patents filed',        value: '23',        source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'products-services',    label: 'Products & services',  value: '70',        source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'prototypes-developed', label: 'Prototypes developed', value: '127',       source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'partners',             label: 'Partners',             value: '13',        source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
    { _key: 'fund-raised',          label: 'Fund raised',          value: '₹5.60 Cr',  source: 'KPI review Apr 2026', asOfDate: '2026-04-01' },
  ],
}

// ── Apply benefits ────────────────────────────────────────────────────────────

const applyBenefits = [
  { _id: 'benefit-seed-grant',      _type: 'applyBenefits', sortOrder: 1, value: 'up to ₹25L', label: 'Seed grant',        detail: 'Equity-based; Centre takes 1–3% on signing.' },
  { _id: 'benefit-space',           _type: 'applyBenefits', sortOrder: 2, value: 'Centre',      label: '16,000 sq ft',      detail: 'Industry 4.0 facility — IoT bays, edge compute, demo infrastructure.' },
  { _id: 'benefit-mentors',         _type: 'applyBenefits', sortOrder: 3, value: 'Mentors',     label: 'Domain mentors',    detail: 'Industry practitioners, not generalist advisors.' },
  { _id: 'benefit-market-support',  _type: 'applyBenefits', sortOrder: 4, value: '50%',         label: 'Market support',    detail: 'Reimbursement on qualifying customer-development travel.' },
  { _id: 'benefit-network',         _type: 'applyBenefits', sortOrder: 5, value: 'Network',     label: 'Partner ecosystem', detail: 'HPE · Intel · Bosch · Schneider · IEEE · KDEM.' },
]

// ── Partners ──────────────────────────────────────────────────────────────────

const partners = [
  { _id: 'partner-hpe',       _type: 'partner', sortOrder: 1, name: 'HPE',                              tier: 'corporate', useWhiteChip: true  },
  { _id: 'partner-intel',     _type: 'partner', sortOrder: 2, name: 'Intel',                            tier: 'corporate', useWhiteChip: false },
  { _id: 'partner-bosch',     _type: 'partner', sortOrder: 3, name: 'Bosch',                            tier: 'corporate', useWhiteChip: true  },
  { _id: 'partner-schneider', _type: 'partner', sortOrder: 4, name: 'Schneider Electric',               tier: 'corporate', useWhiteChip: false },
  { _id: 'partner-ieee',      _type: 'partner', sortOrder: 5, name: 'IEEE',                             tier: 'academic',  useWhiteChip: false },
  { _id: 'partner-kdem',      _type: 'partner', sortOrder: 6, name: 'Karnataka Digital Economy Mission', tier: 'corporate', useWhiteChip: true  },
]

// ── Governing Council ─────────────────────────────────────────────────────────

const governingCouncil = [
  { name: 'Sh. Arvind Kumar',       designation: 'Director General, STPI, MeitY, Government of India',                                                                    role: 'Chairperson',          sortOrder: 1 },
  { name: 'Dr. Sanjay Kumar Gupta', designation: 'Senior Director, STPI',                                                                                                 role: 'Vice Chairperson',     sortOrder: 2 },
  { name: 'Smt. Bhawna Agarwal',    designation: 'Senior Vice President & Managing Director, Hewlett Packard Enterprise, India',                                           role: 'Chief Mentor & Member', sortOrder: 3 },
  { name: 'Dr. Sanjay Tyagi',       designation: 'Director, STPI Bengaluru',                                                                                              role: 'Member',               sortOrder: 4 },
  { name: 'Sh. Rahul S., IAS',      designation: 'Managing Director, KITS & Director, Dept of Electronics, IT, BT & S&T, Government of Karnataka',                       role: 'Member',               sortOrder: 5 },
  { name: 'Sh. Pradeep Gupta',      designation: 'Chairman, Cyber Media Group',                                                                                           role: 'Member',               sortOrder: 6 },
  { name: 'Sh. Ashok Chandak',      designation: 'President, India Electronics & Semiconductor Association (IESA), Bengaluru',                                            role: 'Member',               sortOrder: 7 },
  { name: 'Sh. Debabrata Das',      designation: 'Director, International Institute of Information Technology Bangalore (IIITB)',                                          role: 'Member',               sortOrder: 8 },
  { name: 'Sh. Rakesh Dubey',       designation: 'Director, Startups & Innovation, STPI',                                                                                 role: 'Member',               sortOrder: 9 },
  { name: 'Dr. Nishant Peddagopu', designation: 'Chief Operating Officer, CoE-EA',                                                                                        role: 'Member Secretary',     sortOrder: 10 },
].map((m, i) => ({ ...m, _id: `team-gc-${i + 1}`, _type: 'team', group: 'governing-council' }))

// ── Programme Management Group ────────────────────────────────────────────────

const pmg = [
  { name: 'Smt. Bhawna Agarwal',      designation: 'Senior Vice President & Managing Director, Hewlett Packard Enterprise, India', role: 'Chairperson & Chief Mentor', sortOrder: 1 },
  { name: 'Dr. Sanjay Tyagi',         designation: 'Director, STPI Bengaluru',                                                     role: 'Co-Chair',                   sortOrder: 2 },
  { name: 'Smt. Ranjitha M. P., KAS', designation: 'General Manager – IT, KITS, Government of Karnataka',                          role: 'Member',                     sortOrder: 3 },
  { name: 'Sh. Pradeep Gupta',        designation: 'Chairman, Cyber Media Group',                                                   role: 'Member',                     sortOrder: 4 },
  { name: 'Sh. Ashok Chandak',        designation: 'President, India Electronics & Semiconductor Association (IESA)',               role: 'Member',                     sortOrder: 5 },
  { name: 'Dr. Prasanna Kumar S.C.',  designation: 'Representative from Academia · Professor, R.V. College of Engineering',         role: 'Member',                     sortOrder: 6 },
  { name: 'Sh. Rakesh Dubey',         designation: 'Director, STPI HQ',                                                             role: 'Member',                     sortOrder: 7 },
  { name: 'Sh. Mahadesha V',          designation: "Scientist 'F', STPI Bengaluru",                                                 role: 'Member',                     sortOrder: 8 },
  { name: 'Dr. Nishant Peddagopu',   designation: 'Chief Operating Officer, CoE-EA',                                                role: 'Member Secretary',           sortOrder: 9 },
].map((m, i) => ({ ...m, _id: `team-pmg-${i + 1}`, _type: 'team', group: 'pmg' }))

// ── Startups ──────────────────────────────────────────────────────────────────

const startups = [
  { name: 'Abhiyantrik Solutions',           domain: 'Home Automation',     stage: 'Growth' },
  { name: 'Ada Lovelace Software',           domain: 'AssistiveTech',       stage: 'Growth' },
  { name: 'Artitech Innovations',            domain: 'Industry 4.0',        stage: 'Growth' },
  { name: 'Atibha R&D',                      domain: 'AI / ML',             stage: 'Growth' },
  { name: 'Avatarbot',                       domain: 'Smart Energy',        stage: 'Growth' },
  { name: 'Dopamine Technology',             domain: 'Smart Manufacturing', stage: 'Growth' },
  { name: 'Evoride Motors',                  domain: 'E-Mobility',          stage: 'Growth' },
  { name: 'Ouranos Robotics',                domain: 'AgriTech',            stage: 'Growth' },
  { name: 'Prayogik Energy',                 domain: 'Smart Energy',        stage: 'Growth' },
  { name: 'STG Labs India',                  domain: 'Smart Energy',        stage: 'Growth' },
  { name: 'Suncharge Smartgrids India',      domain: 'CleanTech',           stage: 'Early'  },
  { name: 'Ignomagine (Enlightened Machines)', domain: 'Robotics',          stage: 'Early'  },
  { name: 'Small Acts Technologies',         domain: 'HealthTech',          stage: 'Early'  },
  { name: 'DSeT Consulting',                 domain: 'Industry 4.0',        stage: 'Early'  },
  { name: 'Ikshana Bin',                     domain: 'Sustainability',      stage: 'Early'  },
  { name: 'Kubar Protocol',                  domain: 'FinTech',             stage: 'Early'  },
  { name: 'Iqponics Technologies',           domain: 'AgriTech',            stage: 'Early'  },
  { name: 'Stavar Systems',                  domain: 'IoT',                 stage: 'Early'  },
  { name: 'Ecologia Designs',                domain: 'IoT',                 stage: 'Early'  },
  { name: 'Amlaan RiverCorp',                domain: 'Sustainability',      stage: 'Early'  },
  { name: 'Enwinove Social Solutions',       domain: 'Smart Water',         stage: 'Early'  },
  { name: 'ZeroMOQ',                         domain: 'Smart Manufacturing', stage: 'Early'  },
  { name: 'Zenathom',                        domain: 'CleanTech',           stage: 'Early'  },
  { name: 'Bharat Dome Innovation',          domain: 'SpaceTech',           stage: 'Early'  },
  { name: 'Green Junction Technologies',     domain: 'E-Mobility',          stage: 'Early'  },
  { name: 'Augtual Reality Labs',            domain: 'Extended Reality',    stage: 'Early'  },
  { name: 'YAPPES Technologies',             domain: 'Enterprise SaaS',     stage: 'Early'  },
  { name: 'TechXEarthSpace',                 domain: 'ClimateTech',         stage: 'Early'  },
  { name: 'Trustadditive',                   domain: 'Smart Manufacturing', stage: 'Early'  },
  { name: 'Drobots Tech',                    domain: 'DronesTech',          stage: 'Early'  },
  { name: 'Solitary Spaces',                 domain: 'DesignTech',          stage: 'Early'  },
  { name: 'PRIMESOC Technologies',           domain: 'Semiconductor',       stage: 'Early'  },
  { name: 'Aavishkaara Electronics India',   domain: 'Electronics',         stage: 'Early'  },
  { name: 'Bworth Technologies',             domain: 'FashionTech',         stage: 'Early'  },
  { name: 'TEA Inntech Services',            domain: 'AgriTech',            stage: 'Early'  },
  { name: 'Aarts Maestro',                   domain: 'CreativeTech',        stage: 'Early'  },
  { name: 'Source X',                        domain: 'MarketingTech',       stage: 'Early'  },
  { name: 'Billionloans Technology Services', domain: 'FinTech',            stage: 'Early'  },
  { name: 'Enectron Energy Storage Systems', domain: 'CleanTech',           stage: 'Early'  },
  { name: 'Zealdash Solutions',              domain: 'Enterprise SaaS',     stage: 'Early'  },
  { name: 'Hypertechpreneurs',               domain: 'AI / DeepTech',       stage: 'Early'  },
  { name: 'Trinav Spacetech',                domain: 'SpaceTech',           stage: 'Early'  },
  { name: 'Calypsion Innovations',           domain: 'Industry 4.0',        stage: 'Early'  },
  { name: 'Sunitech AI',                     domain: 'EdTech',              stage: 'Early'  },
  { name: 'Fiacre Telematics',               domain: 'MobilityTech',        stage: 'Early'  },
  { name: 'Knovative Tech Labs',             domain: 'IT Services',         stage: 'Early'  },
  { name: 'Eyres AI Solutions',              domain: 'Industrial AI',        stage: 'Early'  },
  { name: 'MeetNotes',                       domain: 'ProductivityTech',    stage: 'Early'  },
].map((s, i) => ({
  ...s,
  _id: `startup-${String(i + 1).padStart(3, '0')}`,
  _type: 'startup',
  status: 'active',
}))

// ── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('SANITY_API_WRITE_TOKEN is not set. Get one from sanity.io/manage → API → Tokens (Editor role).')
    process.exit(1)
  }

  const docs = [
    impactMetrics,
    ...applyBenefits,
    ...partners,
    ...governingCouncil,
    ...pmg,
    ...startups,
  ]

  console.log(`Seeding ${docs.length} documents to project ${client.config().projectId}…`)

  const tx = client.transaction()
  for (const doc of docs) {
    tx.createOrReplace(doc as Parameters<typeof tx.createOrReplace>[0])
  }
  await tx.commit()

  console.log(`Done. ${docs.length} documents seeded.`)
  console.log('\nNext steps:')
  console.log('  1. Open /studio to verify documents appeared')
  console.log('  2. Upload partner logos via Studio → Partner → logo field')
  console.log('  3. Configure webhook at sanity.io/manage → API → Webhooks')
  console.log('     URL: https://your-domain.vercel.app/api/revalidate')
  console.log('     Header: x-sanity-webhook-secret: <your SANITY_REVALIDATE_SECRET>')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
