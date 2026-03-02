import { defineField, defineType } from "sanity";

export const courseSchema = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "track", title: "Track", type: "string",
      options: { list: ["Fundamentals", "Anchor", "DeFi", "NFT", "Security"] }
    }),
    defineField({ name: "difficulty", title: "Difficulty", type: "number",
      options: { list: [{ title: "Beginner", value: 1 }, { title: "Intermediate", value: 2 }, { title: "Advanced", value: 3 }] }
    }),
    defineField({ name: "xp", title: "XP Reward", type: "number" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "lessons", title: "Lessons", type: "array", of: [{ type: "reference", to: [{ type: "lesson" }] }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "track", media: "thumbnail" },
  },
});