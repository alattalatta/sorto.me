import { promises as fs } from 'fs'
import path from 'path'

import del from 'del'
import klaw from 'klaw'

import { parse } from './parse'
import type { DocMetadata } from './types'

const relative = path.join.bind(null, __dirname)

del('data/**/*.json')
  .then(async () => {
    const docsMeta: DocMetadata[] = []

    for await (const { path: filePath, stats } of klaw(relative('mdx'))) {
      if (stats.isDirectory() || !filePath.endsWith('.mdx')) {
        continue
      }

      const relPath = path.relative(relative('mdx'), filePath)
      const dirname = path.dirname(relPath)

      const parseAsync = parse(filePath)

      await fs.mkdir(relative('data', dirname), { recursive: true })
      const parsedDoc = await parseAsync

      docsMeta.push(parsedDoc.meta)

      fs.writeFile(
        relative('data', dirname, path.basename(filePath).replace(/mdx$/i, 'json')),
        JSON.stringify(parsedDoc),
      )
    }

    return fs.writeFile(relative('data/index.json'), JSON.stringify(docsMeta))
  })
  .catch(console.error)