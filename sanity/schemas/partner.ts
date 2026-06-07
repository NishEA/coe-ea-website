import { defineType, defineField } from "sanity";

/** A corporate or academic partner — design-doc §9. */
export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tier",
      type: "string",
      options: { list: ["corporate", "academic"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mouDate",
      title: "MoU date",
      type: "date",
    }),
    defineField({
      name: "useWhiteChip",
      title: "White chip background",
      type: "boolean",
      description: "Enable for logos with white backgrounds (HPE, Bosch, KDEM). Wraps logo in a white pill.",
      initialValue: false,
    }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
    defineField({ name: "blurb", type: "text", rows: 2 }),
    defineField({ name: "url", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
});
