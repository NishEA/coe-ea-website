"use client";

/**
 * Embedded Sanity Studio at /studio (design-doc §9).
 * Config is in the repo-root sanity.config.ts. The Studio will not fully
 * function until a real Sanity project is provisioned (procurement, TODOS.md #8).
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
