import path from 'path'
import url from 'url'

import test from 'ava'

import { parse } from './parse'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

test('can parse a file, and encode html entities in description', async (t) => {
  const mockFilePath = path.join(__dirname, 'mocks/foo.mdx')

  const parsed = await parse(mockFilePath)
  const { updated, ...meta } = parsed.meta

  t.is(parsed.content.trim(), 'zzz')
  t.deepEqual(meta, {
    bcd: 'foo.bar',
    description: 'aaa&amp;bbb',
    slug: 'mocks/foo',
    title: 'foobar',
  })
})

test('can parse a minimal file', async (t) => {
  const mockFilePath = path.join(__dirname, 'mocks/minimal-data.mdx')

  const parsed = await parse(mockFilePath)
  const { updated, ...meta } = parsed.meta

  t.is(parsed.content.trim(), '')
  t.deepEqual(meta, {
    description: null,
    slug: 'mocks/minimal-data',
    title: 'title',
  })
})
