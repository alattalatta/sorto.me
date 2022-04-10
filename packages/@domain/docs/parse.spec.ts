import path from 'node:path'

import { filePath } from '@lib/functions/server'
import test from 'ava'

import { parse } from './parse'

const __dirname = filePath(import.meta.url)

test('can parse a file with explicit description; encodes html entities of the description', async (t) => {
  const docPath = path.join(__dirname, 'mocks/explicit-description.mdx')

  const parsed = await parse(docPath)
  const { updated, ...meta } = parsed.meta

  t.is(parsed.content.trim(), 'zzz')
  t.deepEqual(meta, {
    bcd: 'foo',
    description: 'aaa&amp;bbb',
    slug: 'mocks/explicit-description',
    title: 'foo',
    toc: [],
  })
})

test('can parse a file without explicit description; strip Markdown syntax and encodes html entities of extracted description', async (t) => {
  const docPath = path.join(__dirname, 'mocks/implicit-description.mdx')

  const parsed = await parse(docPath)
  const { updated, ...meta } = parsed.meta

  t.is(parsed.content.trim(), '# Should ignore this heading\n\n`<zzz>` **aa**')

  t.deepEqual(meta, {
    description: '\\&lt;zzz&gt; aa',
    slug: 'mocks/implicit-description',
    title: 'foo',
    toc: [['should-ignore-this-heading', 'Should ignore this heading']],
  })
})

test('can parse a file with explicit null description', async (t) => {
  const docPath = path.join(__dirname, 'mocks/explicit-null-description.mdx')

  const parsed = await parse(docPath)
  const { updated, ...meta } = parsed.meta

  t.is(parsed.content.trim(), '`<zzz>` **aa**')

  t.deepEqual(meta, {
    description: null,
    slug: 'mocks/explicit-null-description',
    title: 'foo',
    toc: [],
  })
})

test('can parse a file with only a title; its description must be null', async (t) => {
  const docPath = path.join(__dirname, 'mocks/minimal-data.mdx')

  const parsed = await parse(docPath)
  const { updated, ...meta } = parsed.meta

  t.is(parsed.content.trim(), '')
  t.deepEqual(meta, {
    description: null,
    slug: 'mocks/minimal-data',
    title: 'title',
    toc: [],
  })
})

test('can extract a list of level 1 headings', async (t) => {
  const docPath = path.join(__dirname, 'mocks/table-of-contents.mdx')

  const parsed = await parse(docPath)

  t.deepEqual(parsed.meta.toc, [
    ['first', 'First'],
    ['second', 'Second'],
    ['third', 'Third'],
    ['fourth', 'Fourth'],
  ])
})
