import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

// TODO: Replace these with your actual Sanity project values
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
	name: "black-varnish",
	title: "Black Varnish",
	projectId,
	dataset,
	basePath: "/studio", // Where the Sanity Studio will be accessible
	plugins: [
		structureTool(), // Content structure tool
		visionTool(), // GROQ query tool for development
	],
	schema: {
		types: [
			// Add your schema types here
			// Example:
			// {
			//   name: 'post',
			//   type: 'document',
			//   title: 'Post',
			//   fields: [
			//     { name: 'title', type: 'string', title: 'Title' },
			//     { name: 'body', type: 'text', title: 'Body' }
			//   ]
			// }
		],
	},
});
