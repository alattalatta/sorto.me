import { promises as fs } from 'fs'
import path from 'path'

import { parsePost, PostMetadata } from '../posts'

describe('Post utilities', () => {
  describe('parsePost', () => {
    it('can parse post without description and image', async () => {
      const filePath = path.resolve(__dirname, 'mocks/posts/2020-02-02+post.mdx')
      const file = await fs.readFile(filePath)

      const {
        content,
        meta: { updated, ...meta },
      } = await parsePost(filePath, file)

      expect(content).toBe('aaa')
      expect(meta).toEqual<Omit<PostMetadata, 'updated'>>({
        created: '2020-02-02',
        description: 'front matter excerpt',
        image: '/images/default.jpg',
        slug: 'post',
        title: 'front matter title',
        excerpt: 'front matter excerpt',
      })
    })

    it('can parse post with explicit description and image', async () => {
      const filePath = path.resolve(__dirname, 'mocks/posts/2020-02-03+with-everything.mdx')
      const file = await fs.readFile(filePath)

      const {
        content,
        meta: { updated, ...meta },
      } = await parsePost(filePath, file)

      expect(content).toBe('ccc')
      expect(meta).toEqual<Omit<PostMetadata, 'updated'>>({
        created: '2020-02-03',
        description: 'front matter description',
        image: '/images/1999-01-01/image.jpg',
        slug: 'with-everything',
        title: 'front matter title',
        excerpt: 'front matter excerpt',
      })
    })
  })
})
