/**
 * Sanity Studio configuration — embedded at /studio (design-doc §9).
 * The Studio route is isolated under app/studio/ with its own layout.
 *
 * Schemas are intentionally EMPTY in the W1 scaffold. Schema authoring —
 * including the `impactMetrics` singleton — follows W1 (design-doc §9, §17).
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "coe-ea",
  title: "CoE-EA",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
