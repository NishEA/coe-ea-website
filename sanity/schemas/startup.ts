import { defineType, defineField } from "sanity";

/** A portfolio startup — all cohorts. Domain is free-text to accommodate new verticals. */
export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "domain",
      type: "string",
      description: "e.g. Smart Manufacturing, AgriTech, AI / ML",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stage",
      type: "string",
      options: { list: ["Early", "Growth", "Alumni"], layout: "radio" },
      initialValue: "Early",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cohort",
      type: "string",
      options: {
        list: ["Cohort 1", "Cohort 2", "Cohort 3"],
        layout: "radio",
      },
      description: "Which intake cohort this startup belongs to.",
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["active", "alumni"], layout: "radio" },
      initialValue: "active",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whatTheyBuild",
      title: "What they build",
      type: "text",
      rows: 2,
      description: "2-line plain-text summary for the portfolio ledger.",
    }),
    defineField({ name: "founder", type: "string" }),
    defineField({
      name: "founderRole",
      title: "Founder role",
      type: "string",
    }),
    defineField({
      name: "fundingRaised",
      title: "Funding raised",
      type: "string",
      description: "Formatted for display — e.g. ₹2.5 Cr, $1.2M.",
    }),
    defineField({ name: "jobsCreated", title: "Jobs created", type: "number" }),
    defineField({ name: "ipFiled", title: "IP filed", type: "number" }),
    defineField({ name: "dateJoined", title: "Date joined", type: "date" }),
    defineField({ name: "website", type: "url" }),
    defineField({
      name: "logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "founderPhoto",
      title: "Founder photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "domain", media: "logo" },
  },
});
