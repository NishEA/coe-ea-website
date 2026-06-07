import { defineType, defineField } from "sanity";

/** A single benefit shown on the /apply page and TheApplication spread. */
export const applyBenefits = defineType({
  name: "applyBenefits",
  title: "Apply benefits",
  type: "document",
  fields: [
    defineField({
      name: "value",
      type: "string",
      description: "Large headline value — e.g. up to ₹25L, 16,000 sq ft.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      description: "Short label below the value — e.g. Seed grant.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "detail",
      type: "string",
      description: "One-line explanatory note.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
