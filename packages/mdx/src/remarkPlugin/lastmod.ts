import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { Root } from 'mdast'
import type { Plugin } from 'unified'

export const remarkLastmodPlugin: Plugin<void[], Root> = () => {
  return async function (_, file) {
    const filedir = path.dirname(file.history[0])
    const filename = path.basename(file.history[0], '.mdx')

    const frontmatter = (file.data.astro as { frontmatter: Record<string, string> }).frontmatter

    try {
      const lastmod = await readFile(`${filedir}/${filename}.lastmod`)
      frontmatter.lastModified = lastmod.toString()
    } catch (e) {
      console.log(filename, e)
      frontmatter.lastModified = ''
    }
  }
}
