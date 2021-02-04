import path from 'path'

import mock from 'mock-fs'

import { onlyMDXFiles, readFilesRec } from '../system'

describe('System utilities', () => {
  describe('onlyMDXFiles', () => {
    it('can filter out non-MDX file paths', async () => {
      const paths = ['./a.mdx', 'b.mdx/c.ts', 'd.md', 'e.mdx']

      expect(onlyMDXFiles(paths)).toEqual(['./a.mdx', 'e.mdx'])
    })
  })

  describe('readFilesRec', () => {
    beforeAll(() =>
      // fake fs, should be in ascending order
      mock({
        src: {
          'a.txt': 'cat',
          'b.txt': 'dog',
          beverages: {},
          items: {
            'shield.mdx': '',
            'sword.mdx': '',
          },
          'z.txt': 'ilon',
        },
      }),
    )

    it('can traverse all files under a path recursively', async () => {
      const iterator = readFilesRec(path.join(process.cwd(), 'src'))

      expect(await prepareValue(iterator.next())).toBe('src/a.txt')
      expect(await prepareValue(iterator.next())).toBe('src/b.txt')
      expect(await prepareValue(iterator.next())).toBe('src/items/shield.mdx')
      expect(await prepareValue(iterator.next())).toBe('src/items/sword.mdx')
      expect(await prepareValue(iterator.next())).toBe('src/z.txt')

      async function prepareValue(cursor: Promise<IteratorResult<string, void>>): Promise<string | null> {
        const value = (await cursor).value
        if (!value) {
          return null
        }

        return path.relative(process.cwd(), value)
      }
    })

    afterAll(() => mock.restore())
  })
})
