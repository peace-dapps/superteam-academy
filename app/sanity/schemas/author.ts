import { defineField, defineType } from "sanity";

export const authorSchema = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "wallet", title: "Solana Wallet", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "avatar", title: "Avatar", type: "image" }),
    defineField({ name: "twitter", title: "Twitter", type: "string" }),
    defineField({ name: "github", title: "GitHub", type: "string" }),
  ],
});