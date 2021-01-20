import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

export type PostMetadata = {
  created: string
  excerpt?: string
  title: string
}

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
