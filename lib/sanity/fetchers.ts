import { sanityClient } from "./client";
import {
  startupQuery,
  partnerQuery,
  impactMetricsQuery,
  applyBenefitsQuery,
  teamByGroupQuery,
  eventsQuery,
} from "./queries";

export interface SanityStartup {
  _id: string;
  name: string;
  domain: string;
  stage: "Early" | "Growth" | "Alumni";
  cohort?: string;
  status: "active" | "alumni";
  whatTheyBuild?: string;
  founder?: string;
  founderRole?: string;
  fundingRaised?: string;
  jobsCreated?: number;
  ipFiled?: number;
  dateJoined?: string;
  website?: string;
}

export interface SanityPartner {
  _id: string;
  name: string;
  tier: "corporate" | "academic";
  useWhiteChip?: boolean;
  blurb?: string;
  url?: string;
  logoUrl?: string;
}

export interface SanityImpactMetric {
  label: string;
  value: string;
  source: string;
  asOfDate: string;
}

export interface SanityApplyBenefit {
  _id: string;
  value: string;
  label: string;
  detail?: string;
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  group: "governing-council" | "pmg" | "coe-team";
  role?: string;
  designation?: string;
  photoUrl?: string;
}

export interface SanityEvent {
  _id: string;
  name: string;
  date: string;
  type: "hackathon" | "ideathon" | "workshop" | "industrial visit";
  college?: string;
  attendees?: number;
  summary?: string;
  photoUrl?: string;
}

export async function getStartups(): Promise<SanityStartup[]> {
  return sanityClient.fetch(startupQuery);
}

export async function getPartners(): Promise<SanityPartner[]> {
  return sanityClient.fetch(partnerQuery);
}

export async function getImpactMetrics(): Promise<SanityImpactMetric[]> {
  const doc = await sanityClient.fetch(impactMetricsQuery);
  return doc?.metrics ?? [];
}

export async function getApplyBenefits(): Promise<SanityApplyBenefit[]> {
  return sanityClient.fetch(applyBenefitsQuery);
}

export async function getTeamByGroup(
  group: "governing-council" | "pmg" | "coe-team"
): Promise<SanityTeamMember[]> {
  return sanityClient.fetch(teamByGroupQuery, { group });
}

export async function getEvents(): Promise<SanityEvent[]> {
  return sanityClient.fetch(eventsQuery);
}
