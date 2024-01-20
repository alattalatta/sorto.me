import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    description: z.string(),
    image: z.string(),
    title: z.string(),
  }),
  type: 'content',
})

const docCollection = defineCollection({
  schema: z.object({
    bcd: z.string().optional(),
    description: z.string().optional(),
    title: z.string(),
  }),
  type: 'content',
})

export const collections = {
  docs: docCollection,
  posts: blogCollection,
}
