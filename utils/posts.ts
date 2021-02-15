import { promises as fs } from 'fs'
import path from 'path'

import matter from 'gray-matter'

import { onlyMDXFiles, readLastModified } from './system'

export type PostMetadata = {
  /**
   * String representing a date which the post is published. (`yyyy-MM-dd`)
   * @format date
   */
  created: string
  excerpt?: string
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
  const { content, data } = matter(source)

  const fileName = path.basename(filePath)
  const [created, slug] = fileName.split('+')

  const updated = await readLastModified(filePath)

  return {
    content,
    meta: {
      ...data,
      created,
      image: data.image || '/images/default.jpg',
      slug: slug.replace('.mdx', ''),
      updated,
    } as PostMetadata,
  }
}

export const POSTS_PATH = path.join(process.cwd(), 'posts')
export const POST_FILES_PENDING: Promise<string[]> = fs.readdir(POSTS_PATH).then(onlyMDXFiles)
