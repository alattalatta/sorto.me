import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  loader: glob({ base: 'posts', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    z.object({
      description: z.string(),
      image: image(),
      title: z.string(),
      titleShort: z.string().optional(),
    }),
})

const docCollection = defineCollection({
  loader: glob({ base: 'docs', pattern: '**/*.mdx' }),
  schema: z.object({
    bcd: z.string().optional(),
    description: z.string().optional(),
    pinnable: z.boolean().default(true),
    title: z.string(),
    titleShort: z.string().optional(),
  }),
})

export const collections = {
  docs: docCollection,
  posts: blogCollection,
}
