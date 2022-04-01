import type { DocMetadata } from '@domain/docs'
import { parse } from '@domain/docs/parse'
import { filePath } from '@lib/functions/server'
import { compile } from '@lib/mdx/compiler'
import klaw from 'klaw'
import fs from 'node:fs/promises'
import path from 'node:path'

import { minify } from './minify'

const __dirname = filePath(import.meta.url)

const packageRoot = path.resolve.bind(null, __dirname, '../..')

export async function main(): Promise<void> {
  const mainPromises: Promise<unknown>[] = []
  const docsMeta: DocMetadata[] = []

  for await (const { path: docPath, stats } of klaw(packageRoot('contents/docs'))) {
    if (stats.isDirectory() || !docPath.endsWith('.mdx')) {
      continue
    }

    const relPath = path.relative(packageRoot('contents/docs'), docPath)
    const dirname = path.dirname(relPath)

    const parseAsync = parse(docPath, packageRoot('contents/docs'))

    await fs.mkdir(packageRoot('out/docs', dirname), { recursive: true })

    mainPromises.push(
      fs
        .mkdir(packageRoot('out/docs', dirname), { recursive: true })
        .then(() => parseAsync)
        .then(async ({ content, meta }) => {
          docsMeta.push(meta)
          return fs.writeFile(
            packageRoot('out/docs', dirname, path.basename(docPath).replace(/mdx$/i, 'json')),
            JSON.stringify({
              content: await compile(content).then(minify),
              meta,
            }),
          )
        }),
    )
  }

  await Promise.all(mainPromises)
  await Promise.all([
    fs.writeFile(packageRoot('out/docs/index.json'), JSON.stringify(docsMeta)),
    fs.writeFile(
      packageRoot('out/docs/slugMap.json'),
      JSON.stringify(docsMeta.reduce((acc, { slug, title }) => ({ ...acc, [slug]: title }), {})),
    ),
  ])

  console.log(`Done compiling ${docsMeta.length} docs.`)
}
