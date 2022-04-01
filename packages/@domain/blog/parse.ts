import { promises as fs } from 'fs'
import path from 'path'

import { readLastModified } from '@lib/functions/server'
import { escapeUTF8 } from 'entities'
import matter from 'gray-matter'

import type { Post, PostMetadata } from './types'

/**
 * Parses a MDX post file. Creation date is parsed from the file's name.
 *
 * @param postPath File's path.
 */
async function parse(postPath: string): Promise<Post> {
  const sourceAsync = fs.readFile(postPath)
  const lastModifiedAsync = readLastModified(postPath)

  const {
    content,
    data: { description, excerpt, ...data },
  } = matter(await sourceAsync)
  const fileName = path.basename(postPath)

  return {
    content,
    meta: {
      ...data,
      created: fileName.split('--')[0],
      description: typeof description === 'string' ? escapeUTF8(description) : null,
      image: typeof data.image === 'string' ? data.image : '/images/default.jpg',
      slug: path.basename(postPath).replace('.mdx', ''),
      updated: (await lastModifiedAsync).toISOString(),
    } as PostMetadata,
  }
}

export { parse }
