import { defineType, defineField } from "sanity";

export default defineType({
	name: "product",
	title: "Product",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Product Name",
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
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "mainImage",
			title: "Main Image",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "images",
			title: "Additional Images",
			type: "array",
			of: [{ type: "image", options: { hotspot: true } }],
		}),
		defineField({
			name: "price",
			title: "Price",
			type: "number",
			validation: (Rule) => Rule.required().positive(),
		}),
		defineField({
			name: "stock",
			title: "Stock Quantity",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
		}),
		defineField({
			name: "brand",
			title: "Brand",
			type: "reference",
			to: [{ type: "brand" }],
		}),
		defineField({
			name: "seo",
			title: "SEO",
			type: "seo",
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "mainImage",
			subtitle: "price",
		},
		prepare(selection) {
			const { title, media, subtitle } = selection;
			return {
				title,
				media,
				subtitle: subtitle ? `$${subtitle}` : "No price set",
			};
		},
	},
});
