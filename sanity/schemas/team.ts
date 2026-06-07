import { defineType, defineField } from "sanity";

/**
 * Team / committee member.
 * `group` distinguishes Governing Council from PMG from CoE-EA Team.
 * `role` = committee role (Chairperson, Member Secretary, etc.)
 * `designation` = their actual job title / organisation.
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
    defineField({
      name: "group",
      type: "string",
      options: {
        list: [
          { title: "Governing Council", value: "governing-council" },
          { title: "Programme Management Group", value: "pmg" },
          { title: "CoE-EA Team", value: "coe-team" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "Committee role — e.g. Chairperson, Member Secretary, Member.",
    }),
    defineField({
      name: "designation",
      type: "string",
      description: "Job title and organisation — e.g. Director General, STPI, MeitY.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first within each group.",
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
    }),
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
      description: "Default off.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "group", media: "photo" },
  },
});
