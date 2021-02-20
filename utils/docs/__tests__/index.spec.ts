import { promises as fs } from 'fs'
import path from 'path'

import mock from 'mock-fs'

import { DocMetadata, getDocFiles, parseDoc } from '..'

describe('Docs utilities', () => {
  describe('parseDoc', () => {
    it('can parse all necessary data', async () => {
      const mockFilePath = path.join(__dirname, 'mocks/foo.mdx')
      const fileAsync = fs.readFile(mockFilePath)
      const statAsync = fs.stat(mockFilePath)

      const parsed = await parseDoc(mockFilePath, await fileAsync)

      expect(parsed.content).toBe('zzz')
      expect(parsed.meta).toEqual<DocMetadata>({
        excerpt: 'aaa&#x26;bbb',
        title: 'foobar',
        updated: (await statAsync).mtime.toISOString().slice(0, 10),
      })
    })
  })

  describe('readFilesRec', () => {
    beforeAll(() =>
      // fake fs, should be in ascending order
      mock({
        docs: {
          Web: {
            HTML: {
              'article.mdx': 'article',
            },
            'HTML.mdx': 'HTML',
          },
        },
      }),
    )

    it('can return all mdx files under the docs/ folder', async () => {
      const paths = await getDocFiles()

      expect(paths).toEqual(['Web/HTML/article.mdx', 'Web/HTML.mdx'])
    })

    afterAll(() => mock.restore())
  })
})
