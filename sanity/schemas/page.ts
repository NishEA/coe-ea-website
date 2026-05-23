import { defineType, defineField } from "sanity";

/** Modular one-off page — design-doc §9 ("page" type for COO one-offs). */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Portable Text — modular content blocks. Specialised section types can be added later.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
