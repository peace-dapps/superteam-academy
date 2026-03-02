import { defineField, defineType } from "sanity";

export const lessonSchema = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "xp", title: "XP Reward", type: "number" }),
    defineField({ name: "duration", title: "Duration (mins)", type: "number" }),
    defineField({ name: "content", title: "Content", type: "array",
      of: [
        { type: "block" },
        { type: "code", options: { language: "typescript", withFilename: true } },
        { type: "image", options: { hotspot: true } },
      ]
    }),
    defineField({ name: "starterCode", title: "Starter Code", type: "text" }),
    defineField({ name: "solutionCode", title: "Solution Code", type: "text" }),
    defineField({ name: "hints", title: "Hints", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "quiz", title: "Quiz Questions", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "question", type: "string", title: "Question" },
          { name: "options", type: "array", of: [{ type: "string" }], title: "Options" },
          { name: "correct", type: "number", title: "Correct Answer Index" },
        ]
      }]
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "order" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `Lesson ${subtitle}` }),
  },
});