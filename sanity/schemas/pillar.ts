import { defineType, defineField } from "sanity";

/**
 * A domain pillar — one of the six lab capabilities (design-doc §6).
 * Surfaced on spread 002 / Work; the empty-branch recruitment CTA on spread 002
 * uses `acceptingApplications` (design-doc §16 Pass 2).
 */
export const pillar = defineType({
  name: "pillar",
  title: "Pillar",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      type: "string",
      description: "Slug or short identifier for the icon system (TBD).",
    }),
    defineField({
      name: "acceptingApplications",
      title: "Accepting applications",
      type: "boolean",
      description:
        "Controls spread 002's empty-branch recruitment CTA. When false and there are no startups, the branch is hidden.",
      initialValue: true,
    }),
    defineField({
      name: "relatedStartups",
      title: "Related startups",
      type: "array",
      of: [{ type: "reference", to: [{ type: "startup" }] }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "description" },
  },
});
