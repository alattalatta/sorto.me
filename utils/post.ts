import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

export type PostMetadata = {
  /**
   * String representing a date which the post is published. (`yyyy-MM-dd`)
   * @format date
   */
  created: string
  excerpt?: string
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

  return {
    content,
    meta: {
      ...data,
      created: fileName.split('+')[0],
    } as PostMetadata,
  }
}

export const POSTS_PATH = path.join(process.cwd(), 'posts')
export const POST_FILES: readonly string[] = fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx$/.test(path))
