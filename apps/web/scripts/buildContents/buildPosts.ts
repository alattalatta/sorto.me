import { parse } from '@domain/blog/parse'
import { filePath } from '@lib/functions/server'
import { compile } from '@lib/mdx/compiler'
import fs from 'node:fs/promises'
import path from 'node:path'

import { minify } from './minify'

const __dirname = filePath(import.meta.url)

const packageRoot = path.resolve.bind(null, __dirname, '../..')

export async function main(): Promise<void> {
  await fs.mkdir(packageRoot('out/posts'), { recursive: true })

  const posts = await fs
    .readdir(packageRoot('contents/posts'))
    .then((paths) => paths.filter((it) => it.endsWith('.mdx')))
    .then((paths) => paths.reverse().map((it) => packageRoot('contents/posts', it)))
    .then((paths) => Promise.all(paths.map((it) => parse(it))))

  await Promise.all([
    fs.writeFile(packageRoot('out/posts/index.json'), JSON.stringify(posts.map((parsedPost) => parsedPost.meta))),
    ...posts.map(async ({ content, meta }) => {
      return fs.writeFile(
        packageRoot('out/posts', `${meta.slug}.json`),
        JSON.stringify({ content: await compile(content).then(minify), meta }),
      )
    }),
  ])

  console.log(`Done compiling ${posts.length} posts.`)
}
