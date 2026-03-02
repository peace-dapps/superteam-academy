import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "superteam-academy",
  title: "Superteam Academy CMS",
  projectId: "zdkpw1y1",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});