import { defineType, defineField } from "sanity";

/** Hackathons, ideathons, workshops, industrial visits — design-doc §9. */
export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: ["hackathon", "ideathon", "workshop", "industrial visit"],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "college", type: "string" }),
    defineField({
      name: "attendees",
      title: "Attendees",
      type: "number",
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "photo" },
  },
});
