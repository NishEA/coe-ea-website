import { defineType, defineField } from "sanity";

/** A portfolio startup — design-doc §9 + Section 6 six domain pillars. */
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
      name: "logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "founder", type: "string" }),
    defineField({
      name: "founderRole",
      title: "Founder role",
      type: "string",
    }),
    defineField({
      name: "founderPhoto",
      title: "Founder photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "domain",
      type: "string",
      options: {
        list: [
          { title: "Smart Manufacturing", value: "smart-manufacturing" },
          { title: "Smart Energy", value: "smart-energy" },
          { title: "Smart Water", value: "smart-water" },
          { title: "Smart Farming", value: "smart-farming" },
          { title: "Intelligent Asset Monitoring", value: "intelligent-asset-monitoring" },
          { title: "Connected Transportation", value: "connected-transportation" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whatTheyBuild",
      title: "What they build",
      type: "text",
      rows: 2,
      description: "2-line plain-text summary for the portfolio ledger.",
    }),
    defineField({
      name: "fundingRaised",
      title: "Funding raised",
      type: "string",
      description: "Formatted for display — e.g. ₹2.5 Cr, $1.2M.",
    }),
    defineField({
      name: "jobsCreated",
      title: "Jobs created",
      type: "number",
    }),
    defineField({
      name: "ipFiled",
      title: "IP filed",
      type: "number",
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["active", "alumni"], layout: "radio" },
      initialValue: "active",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dateJoined",
      title: "Date joined",
      type: "date",
    }),
    defineField({ name: "website", type: "url" }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "domain", media: "logo" },
  },
});
