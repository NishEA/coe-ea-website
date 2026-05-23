/**
 * Plausible analytics — no-op until NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 *
 * Cookieless and PII-free. Plausible is EU-hosted (data-residency-audit-v1.md);
 * it carries no PII so it is the lowest-tier residency concern. Disclosure
 * goes in the privacy notice (Part A11 of dpdp-privacy-scaffold-v1.md).
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
