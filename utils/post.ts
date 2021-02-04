import { promises as fs } from 'fs'
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
export const POST_FILES_PENDING: Promise<string[]> = fs.readdir(POSTS_PATH).then(onlyMDXFiles)

export const DOCS_PATH = path.join(process.cwd(), 'docs')
export const getDocFiles = async (): Promise<string[]> => {
  const res: string[] = []
  for await (const f of readFilesRec(DOCS_PATH)) {
    res.push(f)
  }
  return onlyMDXFiles(res).map((file) => path.relative(DOCS_PATH, file))
}

async function* readFilesRec(dir: string): AsyncGenerator<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })

  for (const dirent of dirents) {
    const res = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* readFilesRec(res)
    } else {
      yield res
    }
  }
}

function onlyMDXFiles(paths: string[]): string[] {
  return paths.filter((path) => /\.mdx$/.test(path))
}
