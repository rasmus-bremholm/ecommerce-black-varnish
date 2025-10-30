# Sanity CMS Setup Guide

## Installation Complete ✓

Sanity has been installed and configured in your Next.js project.

## Files Created

### Configuration Files
- `sanity.config.ts` - Main Sanity configuration
- `.env.local.example` - Environment variables template

### Sanity Client
- `lib/sanity/client.ts` - Sanity client for fetching data
- `lib/sanity/image.ts` - Image URL builder helper

### Studio Route
- `app/studio/[[...tool]]/page.tsx` - Sanity Studio embedded in Next.js
- `app/studio/layout.tsx` - Studio-specific layout (no navbar)

### Schemas
- `sanity/schemas/index.ts` - Schema definitions entry point

## Next Steps

### 1. Create a Sanity Project

If you don't have a Sanity project yet:

```bash
# Install Sanity CLI globally (optional)
npm install -g sanity

# Or use npx
npx sanity init
```

Follow the prompts to create a new project. You'll get:
- **Project ID**: Used to connect to your Sanity project
- **Dataset**: Usually "production" for your main dataset

### 2. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Get your Project ID from**: https://www.sanity.io/manage

### 3. Create Schema Types

Edit `sanity/schemas/index.ts` and add your content types. Example:

```typescript
// sanity/schemas/post.ts
export default {
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'body',
      type: 'text',
      title: 'Body'
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at'
    }
  ]
}

// Then export it in sanity/schemas/index.ts
export { default as post } from './post'
export const schemaTypes = [post]
```

Then import it in `sanity.config.ts`:

```typescript
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  // ... other config
  schema: {
    types: schemaTypes,
  },
})
```

### 4. Access Sanity Studio

Once configured, access your Sanity Studio at:

```
http://localhost:3000/studio
```

You'll need to log in with your Sanity account.

### 5. Configure CORS (Important!)

Go to https://www.sanity.io/manage and:
1. Select your project
2. Go to **Settings** → **API**
3. Add your localhost and production URLs to **CORS origins**:
   - `http://localhost:3000` (for development)
   - Your production domain (when deployed)

## Fetching Data

### Example: Fetch all posts

```typescript
// app/blog/page.tsx
import { client } from '@/lib/sanity/client'

async function getPosts() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`)
  return posts
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  )
}
```

### Example: Using images

```typescript
import { urlFor } from '@/lib/sanity/image'

function MyComponent({ image }) {
  return (
    <img
      src={urlFor(image).width(800).url()}
      alt="Description"
    />
  )
}
```

## GROQ Query Language

Sanity uses GROQ (Graph-Relational Object Queries) for fetching data:

```typescript
// Get all posts
const posts = await client.fetch(`*[_type == "post"]`)

// Get a single post by slug
const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, {
  slug: 'my-post-slug'
})

// Get posts with author details
const posts = await client.fetch(`
  *[_type == "post"] {
    title,
    slug,
    author->
  }
`)
```

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/groq)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/sanity-nextjs-guide)
- [Schema Types](https://www.sanity.io/docs/schema-types)

## Troubleshooting

### Studio not loading?
- Check that environment variables are set correctly
- Ensure CORS is configured in Sanity project settings
- Restart your dev server after adding env variables

### Can't fetch data?
- Verify your Project ID and Dataset name
- Check CORS settings
- Ensure content is published in the Studio

### TypeScript errors?
You can generate TypeScript types from your Sanity schema:
```bash
npx sanity@latest schema extract
```
