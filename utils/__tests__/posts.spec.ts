import { promises as fs } from 'fs'
import path from 'path'

import { parsePost, PostMetadata } from '../posts'

describe('Post utilities', () => {
  describe('parsePost', () => {
    it('can parse all necessary data', async () => {
      const fileName = '2020-02-02+post.mdx'
      const file = await fs.readFile(path.resolve(__dirname, 'mocks', fileName))

      const parsed = parsePost(fileName, file)

      expect(parsed.content).toBe('aaa')
      expect(parsed.meta).toEqual<PostMetadata>({
        created: '2020-02-02',
        title: 'front matter title',
        excerpt: 'front matter excerpt',
      })
    })
  })
})
