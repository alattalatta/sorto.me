import path from 'path'

import { parse } from './parse'

describe('Doc parser', () => {
  describe('parse', () => {
    it('can parse all necessary data with encoded excerpt', async () => {
      const mockFilePath = path.join(__dirname, 'mocks/foo.mdx')

      const parsed = await parse(mockFilePath)

      expect(parsed.content.trim()).toBe('zzz')
      expect(parsed.meta).toMatchObject({
        bcd: 'foo.bar',
        description: 'aaa&amp;bbb',
        slug: 'mocks/foo',
        title: 'foobar',
      })
    })

    it('can parse all necessary data from a minimal file', async () => {
      const mockFilePath = path.join(__dirname, 'mocks/minimal-data.mdx')

      const parsed = await parse(mockFilePath)

      expect(parsed.content).toBe('')
      expect(parsed.meta).toMatchObject({
        description: null,
        slug: 'mocks/minimal-data',
        title: 'title',
      })
    })
  })
})
