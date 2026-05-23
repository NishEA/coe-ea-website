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
    defineField({ name: "blurb", type: "text", rows: 2 }),
    defineField({ name: "url", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" },
  },
});
