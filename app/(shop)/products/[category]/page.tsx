import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { groq } from "next-sanity";
import { Box, Container, Typography } from "@mui/material";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
	const { category: categorySlug } = await params;

	const categoryData = await client.fetch(groq`*[_type == "category" && slug.current == $categorySlug][0]{name, description}`, { categorySlug });
	const products = await client.fetch(groq`*[_type == "product" && category->slug.current == $categorySlug]`, { categorySlug });

	return (
		<Container maxWidth='lg'>
			<Box>
				<Typography variant='h2' component='h1'>
					{categoryData.name}
				</Typography>
				<Typography>{categoryData.description}</Typography>
			</Box>
			<Box>{/* Products Grid or something */}</Box>
		</Container>
	);
}
