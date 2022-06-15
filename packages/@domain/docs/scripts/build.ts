import fs from 'node:fs/promises'
import path from 'node:path'

import { filePath } from '@lib/functions/server'
import { compile } from '@lib/mdx/compiler'
import klaw from 'klaw'

import { parse } from '../parse'
import type { DocMetadata } from '../types'

const __dirname = filePath(import.meta.url)

const packageRoot = path.resolve.bind(null, __dirname, '..')

async function main(): Promise<void> {
  const mainPromises: Promise<unknown>[] = []
  const docsMeta: DocMetadata[] = []

  for await (const { path: docPath, stats } of klaw(packageRoot('contents'))) {
    if (stats.isDirectory() || !docPath.endsWith('.mdx')) {
      continue
    }

    const relPath = path.relative(packageRoot('contents'), docPath)
    const dirname = path.dirname(relPath)

    const parseAsync = parse(docPath, packageRoot('contents'))

    await fs.mkdir(packageRoot('out', dirname), { recursive: true })

    mainPromises.push(
      fs
        .mkdir(packageRoot('out', dirname), { recursive: true })
        .then(() => parseAsync)
        .then(async ({ content, meta }) => {
          docsMeta.push(meta)
          return fs.writeFile(
            packageRoot('out', dirname, path.basename(docPath).replace(/mdx$/i, 'json')),
            JSON.stringify({
              content: await compile(content),
              meta,
            }),
          )
        }),
    )
  }

  await Promise.all(mainPromises)
  await Promise.all([
    fs.writeFile(packageRoot('out/index.json'), JSON.stringify(docsMeta)),
    fs.writeFile(
      packageRoot('out/slugMap.json'),
      JSON.stringify(docsMeta.reduce((acc, { slug, title }) => ({ ...acc, [slug]: title }), {})),
    ),
  ])

  console.log(`Done compiling ${docsMeta.length} docs.`)
}

main().catch(console.error)
