import { filePath, readLastModified } from '@lib/functions/server'
import { escapeUTF8 } from 'entities'
import matter from 'gray-matter'
import fs from 'node:fs/promises'
import path from 'node:path'

import type { Doc, DocMetadata } from './types'

const __dirname = filePath(import.meta.url)

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
    data: { description, excerpt, ...data },
  } = matter(await sourceAsync)

  return {
    content,
    meta: {
      ...(data as DocMetadata),
      description: typeof description === 'string' ? escapeUTF8(description) : null,
      slug: path.relative(rootDir || __dirname, docPath).replace(/(^mdx\/)|(.mdx$)/gi, ''),
      updated: (await lastModifiedAsync).toISOString(),
    } as DocMetadata,
  }
}

export { parse }
