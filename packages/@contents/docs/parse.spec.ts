import { promises as fs } from 'fs'
import path from 'path'

import { parse } from './parse'
import type { DocMetadata } from './types'

describe('Doc parser', () => {
  describe('parse', () => {
    it('can parse all necessary data with encoded excerpt', async () => {
      const mockFilePath = path.join(__dirname, 'mocks/foo.mdx')
      const statAsync = fs.stat(mockFilePath)

      const parsed = await parse(mockFilePath)

      expect(parsed.content.trim()).toBe('zzz')
      expect(parsed.meta).toEqual<DocMetadata>({
        bcd: 'foo.bar',
        description: 'aaa&amp;bbb',
        slug: 'mocks/foo',
        title: 'foobar',
        updated: (await statAsync).mtime.toISOString(),
      })
    })

    it('can parse all necessary data from a minimal file', async () => {
      const mockFilePath = path.join(__dirname, 'mocks/minimal-data.mdx')
      const statAsync = fs.stat(mockFilePath)

      const parsed = await parse(mockFilePath)

      expect(parsed.content).toBe('')
      expect(parsed.meta).toEqual<DocMetadata>({
        description: null,
        slug: 'mocks/minimal-data',
        title: 'title',
        updated: (await statAsync).mtime.toISOString(),
      })
    })
  })
})
