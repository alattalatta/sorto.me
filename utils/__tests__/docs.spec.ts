import { promises as fs } from 'fs'
import path from 'path'

import mock from 'mock-fs'

import { DocMetadata, getDocFiles, parseDoc } from '../docs'

describe('Docs utilities', () => {
  describe('parseDoc', () => {
    it('can parse all necessary data', async () => {
      const file = await fs.readFile(path.resolve(__dirname, 'mocks/docs', 'foo.mdx'))

      const parsed = parseDoc(file)

      expect(parsed.content).toBe('zzz')
      expect(parsed.meta).toEqual<DocMetadata>({
        updated: '2021-02-04',
        title: 'foobar',
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
