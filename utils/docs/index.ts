import path from 'path'

import { escapeUTF8 } from 'entities'
import matter from 'gray-matter'

import { onlyMDXFiles, readFilesRec, readLastModified } from '../system'

export type DocMetadata = {
  /** Escaped version of `excerpt`. */
  description: string | null
  excerpt: string | null
  originalTitle: string
  title: string
  /**
   * String representing a date which the doc file was last modified. (`yyyy-MM-dd`)
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
 * @param filePath File's path.
 * @param source File's content as `Buffer`.
 */
export async function parseDoc(filePath: string, source: Buffer): Promise<{ content: string; meta: DocMetadata }> {
  const {
    content,
    data: { excerpt, originalTitle, title, ...data },
  } = matter(source)
  const updated = await readLastModified(filePath)

  return {
    content,
    meta: {
      ...data,
      description: excerpt ? escapeUTF8(excerpt) : null,
      excerpt: excerpt || null,
      originalTitle: originalTitle || title,
      title,
      updated,
    } as DocMetadata,
  }
}
