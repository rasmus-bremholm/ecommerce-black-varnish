import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { groq } from "next-sanity";

export default async function CategoryPage({ params }: { params: { category: string } }) {
	const category = params.category;
	const products = await client.fetch(groq`*[_type == "product" && category->slug.current == $category]`, { category });

	return <main></main>;
}
