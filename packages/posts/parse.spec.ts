import path from 'path'

import { parse } from './parse'
import type { PostMetadata } from './types'

describe('Post utilities', () => {
  describe('parse', () => {
    it('can parse post', async () => {
      const filePath = path.resolve(__dirname, 'mocks/2020-02-03+full.mdx')

      const {
        content,
        meta: { updated, ...meta },
      } = await parse(filePath)

      expect(content.trim()).toBe('ccc')
      expect(meta).toEqual<Omit<PostMetadata, 'updated'>>({
        created: '2020-02-03',
        description: 'front matter description &amp;',
        image: '/images/1999-01-01/image.jpg',
        slug: '2020-02-03+full',
        title: 'front matter title',
      })
    })

    it('can parse post with minimal data', async () => {
      const filePath = path.resolve(__dirname, 'mocks/2020-02-04+minimal.mdx')

      const {
        content,
        meta: { updated, ...meta },
      } = await parse(filePath)

      expect(content.trim()).toBe('')
      expect(meta).toEqual<Omit<PostMetadata, 'updated'>>({
        created: '2020-02-04',
        description: null,
        image: '/images/default.jpg',
        slug: '2020-02-04+minimal',
        title: 'title',
      })
    })
  })
})
