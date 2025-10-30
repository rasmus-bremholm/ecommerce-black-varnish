import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

export default async function ProductPage({ params }: { params: { category: string; slug: string } }) {
	const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: params.slug });

	return <div>Show single product details</div>;
}
