import { defineType, defineField } from "sanity";

/**
 * Team member — design-doc §9.
 *
 * NOTE: storing team email addresses in Sanity (EU-hosted) is flagged in
 * dpdp-privacy-scaffold-v1.md Part D — re-evaluate whether emails belong in
 * the CMS at all or in an internal system. Until that decision lands, `email`
 * is optional and `emailVisible` controls whether it is rendered publicly.
 */
export const team = defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn",
      type: "url",
    }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "emailVisible",
      title: "Show email publicly",
      type: "boolean",
      description: "Default off. See team-schema note re: residency.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
