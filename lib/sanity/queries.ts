/** GROQ queries for all CMS content types. */

export const startupQuery = /* groq */ `
  *[_type == "startup"] | order(stage asc, name asc) {
    _id,
    name,
    domain,
    stage,
    cohort,
    status,
    whatTheyBuild,
    founder,
    founderRole,
    fundingRaised,
    jobsCreated,
    ipFiled,
    dateJoined,
    website
  }
`;

export const partnerQuery = /* groq */ `
  *[_type == "partner"] | order(sortOrder asc, name asc) {
    _id,
    name,
    tier,
    useWhiteChip,
    blurb,
    url,
    "logoUrl": logo.asset->url
  }
`;

export const impactMetricsQuery = /* groq */ `
  *[_type == "impactMetrics"][0] {
    metrics[] {
      label,
      value,
      source,
      asOfDate
    }
  }
`;

export const applyBenefitsQuery = /* groq */ `
  *[_type == "applyBenefits"] | order(sortOrder asc) {
    _id,
    value,
    label,
    detail
  }
`;

export const teamByGroupQuery = /* groq */ `
  *[_type == "team" && group == $group] | order(sortOrder asc) {
    _id,
    name,
    group,
    role,
    designation,
    "photoUrl": photo.asset->url
  }
`;

export const eventsQuery = /* groq */ `
  *[_type == "event"] | order(date desc) {
    _id,
    name,
    date,
    type,
    college,
    attendees,
    summary,
    "photoUrl": photo.asset->url
  }
`;
