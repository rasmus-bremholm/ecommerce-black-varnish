import { defineType, defineField } from "sanity";

export default defineType({
	name: "brand",
	title: "Brand",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Brand Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "logo",
			title: "Brand Logo",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "logo",
		},
	},
});
