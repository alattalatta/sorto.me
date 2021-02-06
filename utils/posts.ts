import { promises as fs } from 'fs'
import path from 'path'

import matter from 'gray-matter'

import { onlyMDXFiles } from './system'

export type PostMetadata = {
  /**
   * String representing a date which the post is published. (`yyyy-MM-dd`)
   * @format date
   */
  created: string
  excerpt?: string
  slug: string
  title: string
}

/**
 * Parses a MDX post file. Creation date uses the file's name, while excerpt and title are parsed from front matter.
 *
 * @param fileName File's name.
 * @param source File's content as `Buffer`.
 */
export function parsePost(fileName: string, source: Buffer): { content: string; meta: PostMetadata } {
  const { content, data } = matter(source)
  const [created, slug] = fileName.split('+')

  return {
    content,
    meta: {
      ...data,
      created,
      slug: slug.replace('.mdx', ''),
    } as PostMetadata,
  }
}

export const POSTS_PATH = path.join(process.cwd(), 'posts')
export const POST_FILES_PENDING: Promise<string[]> = fs.readdir(POSTS_PATH).then(onlyMDXFiles)
