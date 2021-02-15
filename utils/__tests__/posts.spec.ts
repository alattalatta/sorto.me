import { promises as fs } from 'fs'
import path from 'path'

import { parsePost, PostMetadata } from '../posts'

describe('Post utilities', () => {
  describe('parsePost', () => {
    it('can parse all necessary data', async () => {
      const filePath = path.resolve(__dirname, 'mocks/posts/2020-02-02+post.mdx')
      const file = await fs.readFile(filePath)

      const {
        content,
        meta: { updated, ...meta },
      } = await parsePost(filePath, file)

      expect(content).toBe('aaa')
      expect(meta).toEqual<Omit<PostMetadata, 'updated'>>({
        created: '2020-02-02',
        image: '/images/default.jpg',
        slug: 'post',
        title: 'front matter title',
        excerpt: 'front matter excerpt',
      })
    })
  })
})
