import { promises as fs } from 'fs'
import path from 'path'

import { escapeUTF8 } from 'entities'
import matter from 'gray-matter'

import { onlyMDXFiles, readLastModified } from './system'

export type PostMetadata = {
  /**
   * String representing a date which the post is published. (`yyyy-MM-dd`)
   * @format date
   */
  created: string
  /**
   * A text to feed meta description tag. Defaults to `excerpt`.
   */
  description: string | null
  /**
   * A short text to use as a single line description in the post list, and to feed Open Graph description.
   */
  excerpt: string | null
  image: string
  slug: string
  title: string
  /**
   * String representing a date which the post file was last modified. (`yyyy-MM-dd`)
   * @format date
   */
  updated: string
}

/**
 * Parses a MDX post file. Creation date is parsed from the file's name.
 *
 * @param filePath File's path.
 * @param source File's content as `Buffer`.
 */
export async function parsePost(filePath: string, source: Buffer): Promise<{ content: string; meta: PostMetadata }> {
  const {
    content,
    data: { description, excerpt, ...data },
  } = matter(source)
  const fileName = path.basename(filePath)
  const [created, slug] = fileName.split('+')

  const updated = await readLastModified(filePath)

  return {
    content,
    meta: {
      ...data,
      created,
      description: description ? escapeUTF8(description) : excerpt ? escapeUTF8(excerpt) : null,
      excerpt: excerpt || null,
      image: data.image || '/images/default.jpg',
      slug: slug.replace('.mdx', ''),
      updated,
    } as PostMetadata,
  }
}

export const POSTS_PATH = path.join(process.cwd(), 'posts')
export const POST_FILES_PENDING: Promise<string[]> = fs.readdir(POSTS_PATH).then(onlyMDXFiles)
