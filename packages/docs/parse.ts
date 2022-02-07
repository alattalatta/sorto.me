import { promises as fs } from 'fs'
import path from 'path'

import { readLastModified } from '@app/functions'
import { escapeUTF8 } from 'entities'
import matter from 'gray-matter'

import type { Doc, DocMetadata } from './types'

/**
 * Parses a MDX post file. Creation date is parsed from the file's name.
 *
 * @param filePath File's path.
 * @param source File's content as `Buffer`.
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
async function parse(filePath: string): Promise<Doc> {
  const sourceAsync = fs.readFile(filePath)
  const lastModifiedAsync = readLastModified(filePath)

  const {
    content,
    data: { description, excerpt, ...data },
  } = matter(await sourceAsync)

  return {
    content,
    meta: {
      ...(data as DocMetadata),
      description: typeof description === 'string' ? escapeUTF8(description) : null,
      slug: path.relative(__dirname, filePath).replace(/(^mdx\/)|(.mdx$)/gi, ''),
      updated: await lastModifiedAsync,
    } as DocMetadata,
  }
}

export { parse }
