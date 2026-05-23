import { defineType, defineField } from "sanity";

/**
 * Impact metrics — SINGLETON (only one document of this type).
 *
 * Surfaced on spread 005 / Impact + Partners and on `/governance`, with the
 * `source` and `asOfDate` fields visible per metric (design-doc §17 + §18;
 * TODOS.md #10 — metrics source-of-truth + approval workflow).
 *
 * Singleton enforcement (preventing creation of a second document) lives in
 * the Studio structure config — for the W1 scaffold, defining the type is
 * sufficient. Editors will see this as a single "Impact metrics" entry.
 */
export const impactMetrics = defineType({
  name: "impactMetrics",
  title: "Impact metrics",
  type: "document",
  fields: [
    defineField({
      name: "metrics",
      type: "array",
      of: [
        {
          type: "object",
          name: "metric",
          title: "Metric",
          fields: [
            defineField({
              name: "label",
              type: "string",
              description: "e.g. Funding raised, Jobs created, IP filed.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "value",
              type: "string",
              description: "Formatted for display — e.g. ₹X Cr, N startups.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "source",
              type: "string",
              description:
                "Where this number came from — DPR, KITS Annexure, PMG meeting minutes, etc.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "asOfDate",
              title: "As-of date",
              type: "date",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Impact metrics (singleton)" }),
  },
});
