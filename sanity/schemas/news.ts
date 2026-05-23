import { defineType, defineField } from "sanity";

/**
 * News / press article — design-doc §9.
 * Body is Portable Text (Sanity-native), the equivalent of the design-doc's
 * "MDX" note. The renderer on the site converts Portable Text to React.
 */
export const news = defineType({
  name: "news",
  title: "News / Press",
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
      name: "date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "author", type: "string" }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      description: "Portable Text — rich body content.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "heroImage" },
  },
});
