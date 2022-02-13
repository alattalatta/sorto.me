import mock from 'mock-fs'

import { readLastModified } from './file'

describe('System utilities', () => {
  describe('readLastModified', () => {
    beforeAll(() => {
      mock({
        src: {
          virtual: mock.file({
            mtime: new Date('2020-12-28T00:00:00Z'),
          }),
        },
      })
    })

    it("can read a file's last modified date", async () => {
      expect(await readLastModified('src/virtual')).toBe('2020-12-28T00:00:00.000Z')
    })

    afterAll(() => mock.restore())
  })
})
