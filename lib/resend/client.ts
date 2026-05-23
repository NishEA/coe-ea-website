import "server-only";
import { Resend } from "resend";

/**
 * Resend client — transactional email only.
 *
 * Resend stores email content, metadata, and logs in the US regardless of
 * sending region (data-residency-audit-v1.md, R3). Therefore:
 *  - Do NOT place founder PII or pitch-deck contents in email bodies.
 *  - PMG notification emails should link to /admin/applications/[id] rather
 *    than embedding application data.
 *  - Founder acknowledgement emails: greeting + reference number, nothing more.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);
