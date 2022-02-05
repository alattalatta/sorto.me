import { promises as fs } from 'fs'
import path from 'path'

import { readLastModified } from '@app/functions'
import { escapeUTF8 } from 'entities'
import matter from 'gray-matter'

import type { PostMetadata } from './types'

/**
 * Parses a MDX post file. Creation date is parsed from the file's name.
 *
 * @param filePath File's path.
 * @param source File's content as `Buffer`.
 */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
async function parse(filePath: string): Promise<{ content: string; meta: PostMetadata }> {
  const sourceAsync = fs.readFile(filePath)
  const lastModifiedAsync = readLastModified(filePath)

  const {
    content,
    data: { description, excerpt, ...data },
  } = matter(await sourceAsync)
  const fileName = path.basename(filePath)

  return {
    content,
    meta: {
      ...data,
      created: fileName.split('+')[0],
      description: typeof description === 'string' ? escapeUTF8(description) : null,
      image: typeof data.image === 'string' ? data.image : '/images/default.jpg',
      slug: path.basename(filePath).replace('.mdx', ''),
      updated: await lastModifiedAsync,
    } as PostMetadata,
  }
}

export { parse }
