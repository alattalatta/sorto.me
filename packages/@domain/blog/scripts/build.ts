import fs from 'node:fs/promises'
import path from 'node:path'

import { filePath } from '@lib/functions/server'
import { compile } from '@lib/mdx/compiler'
import { minify } from '@lib/mdx/minify'

import { parse } from '../parse'

const __dirname = filePath(import.meta.url)

const packageRoot = path.resolve.bind(null, __dirname, '..')

async function main(): Promise<void> {
  await fs.mkdir(packageRoot('out'), { recursive: true })

  const posts = await fs
    .readdir(packageRoot('contents'))
    .then((paths) => paths.filter((it) => it.endsWith('.mdx')))
    .then((paths) => paths.reverse().map((it) => packageRoot('contents', it)))
    .then((paths) => Promise.all(paths.map((it) => parse(it))))

  await Promise.all([
    fs.writeFile(packageRoot('out/index.json'), JSON.stringify(posts.map((parsedPost) => parsedPost.meta))),
    ...posts.map(async ({ content, meta }) => {
      return fs.writeFile(
        packageRoot('out', `${meta.slug}.json`),
        JSON.stringify({ content: await compile(content).then(minify), meta }),
      )
    }),
  ])

  console.log(`Done compiling ${posts.length} posts.`)
}

main().catch(console.error)
