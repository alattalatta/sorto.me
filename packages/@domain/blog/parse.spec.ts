import { filePath } from '@lib/functions/server'
import test from 'ava'
import path from 'node:path'

import { parse } from './parse'

const __dirname = filePath(import.meta.url)

test('can parse post', async (t) => {
  const postPath = path.resolve(__dirname, 'mocks/2020-02-03--full.mdx')

  const {
    content,
    meta: { updated, ...meta },
  } = await parse(postPath)

  t.is(content.trim(), 'ccc')
  t.deepEqual(meta, {
    created: '2020-02-03',
    description: 'front matter description &amp;',
    image: '/images/1999-01-01/image.jpg',
    slug: '2020-02-03--full',
    title: 'front matter title',
  })
})

test('can parse post with minimal data', async (t) => {
  const postPath = path.resolve(__dirname, 'mocks/2020-02-04--minimal.mdx')

  const {
    content,
    meta: { updated, ...meta },
  } = await parse(postPath)

  t.is(content.trim(), '')
  t.deepEqual(meta, {
    created: '2020-02-04',
    description: null,
    image: '/images/default.jpg',
    slug: '2020-02-04--minimal',
    title: 'title',
  })
})
