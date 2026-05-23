/**
 * Sanity client — CMS content only (public / editorial).
 *
 * Founder PII, applications, bookings, and pitch decks live in Supabase, NOT
 * in Sanity (Sanity's Content Lake is hosted in the EU — see
 * data-residency-audit-v1.md). Treat Sanity as a content surface, not a data
 * store for sensitive material.
 */
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-01-01",
  useCdn: true,
  perspective: "published",
});
