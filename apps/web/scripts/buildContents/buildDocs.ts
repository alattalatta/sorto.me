import { promises as fs } from 'fs'
import path from 'path'

import type { DocMetadata } from '@domain/docs'
import { parse } from '@domain/docs/parse'
import { compile } from '@lib/mdx/compiler'
import klaw from 'klaw'

import { minify } from './minify'

const packageRoot = path.resolve.bind(null, __dirname, '../..')

export async function main(): Promise<void> {
  const docsMeta: DocMetadata[] = []

  for await (const { path: filePath, stats } of klaw(packageRoot('contents/docs'))) {
    if (stats.isDirectory() || !filePath.endsWith('.mdx')) {
      continue
    }

    const relPath = path.relative(packageRoot('contents/docs'), filePath)
    const dirname = path.dirname(relPath)

    const parseAsync = parse(filePath, packageRoot('contents/docs'))

    await fs.mkdir(packageRoot('out/docs', dirname), { recursive: true })
    const { content, meta } = await parseAsync

    docsMeta.push(meta)

    fs.writeFile(
      packageRoot('out/docs', dirname, path.basename(filePath).replace(/mdx$/i, 'json')),
      JSON.stringify({
        content: await compile(content).then(minify),
        meta,
      }),
    )
  }

  await Promise.all([
    fs.writeFile(packageRoot('out/docs/index.json'), JSON.stringify(docsMeta)),
    fs.writeFile(
      packageRoot('out/docs/slugMap.json'),
      JSON.stringify(docsMeta.reduce((acc, { slug, title }) => ({ ...acc, [slug]: title }), {})),
    ),
  ])

  console.log('Done compiling docs.')
}
