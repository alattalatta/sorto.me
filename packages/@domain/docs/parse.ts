import fs from 'node:fs/promises'
import path from 'node:path'

import { filePath, readLastModified } from '@lib/functions/server'
import { extractTOC } from '@lib/mdx/extractor'
import { escapeUTF8 } from 'entities'
import type { GrayMatterFile } from 'gray-matter'
import matter from 'gray-matter'
import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'
import { select } from 'unist-util-select'

import type { Doc, DocMetadata } from './types'

const __dirname = filePath(import.meta.url)

const processor = remark()
  .use(() => (root) => select('paragraph', root) || root.children[0] || root)
  .use(stripMarkdown)

/**
 * Parses a MDX post file. Creation date is parsed from the file's name.
 *
 * @param docPath File's path.
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
async function parse(docPath: string, rootDir?: string): Promise<Doc> {
  const sourceAsync = fs.readFile(docPath)
  const lastModifiedAsync = readLastModified(docPath)

  const {
    content,
    data: { description: descFromMatter, ...data },
    excerpt,
  } = matter(await sourceAsync, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    excerpt: ((file: GrayMatterFile<Buffer>) => (file.excerpt = file.content)) as any,
  })

  const description = await (async () => {
    if (descFromMatter === null) {
      return null
    }

    if (descFromMatter) {
      return escapeUTF8(descFromMatter as string)
    }

    if (excerpt) {
      return escapeUTF8(await processor.process(excerpt).then((res) => String(res).trim()))
    }

    return null
  })()

  const toc = await extractTOC(content)

  return {
    content,
    meta: {
      ...(data as DocMetadata),
      description,
      slug: path.relative(rootDir || __dirname, docPath).replace(/(^mdx\/)|(.mdx$)/gi, ''),
      toc,
      updated: (await lastModifiedAsync).toISOString(),
    } as DocMetadata,
  }
}

export { parse }
