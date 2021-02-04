import path from 'path'

import matter from 'gray-matter'

import { onlyMDXFiles, readFilesRec } from './system'

export type DocMetadata = {
  title: string
  /**
   * String representing a date which the doc is updated. (`yyyy-MM-dd`)
   * @format date
   */
  updated: string
}

export const DOCS_PATH = path.join(process.cwd(), 'docs')

const DOC_FILES_CACHE: string[] = []
/**
 * Returns a string array containing every path to MDX files under the `docs/` folder, relative to the `docs/` folder itself.
 *
 * When used multiple times, return a cached result.
 *
 * @example
 * await getDocFiles() // ['Web/HTML.mdx', 'Web/HTML/article.mdx']
 */
export const getDocFiles = async (): Promise<string[]> => {
  if (!DOC_FILES_CACHE.length) {
    for await (const f of readFilesRec(DOCS_PATH)) {
      DOC_FILES_CACHE.push(path.relative(DOCS_PATH, f))
    }
  }

  return onlyMDXFiles(DOC_FILES_CACHE)
}

/**
 * Parses a MDX post file. Creation date uses the file's name, while excerpt and title are parsed from front matter.
 *
 * @param fileName File's name.
 * @param source File's content as `Buffer`.
 */
export function parseDoc(source: Buffer): { content: string; meta: DocMetadata } {
  const { content, data } = matter(source)

  return {
    content,
    meta: data as DocMetadata,
  }
}
