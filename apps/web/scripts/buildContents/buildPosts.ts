import { promises as fs } from 'fs'
import path from 'path'

import { parse } from '@domain/blog/parse'
import { compile } from '@lib/mdx/compiler'

import { minify } from './minify'

const packageRoot = path.resolve.bind(null, __dirname, '../..')

export async function main(): Promise<void> {
  await fs.mkdir(packageRoot('out/posts'), { recursive: true })
  await fs
    .readdir(packageRoot('contents/posts'))
    .then((paths) => paths.filter((it) => it.endsWith('.mdx')))
    .then((paths) => paths.reverse().map((it) => packageRoot('contents/posts', it)))
    .then((paths) => Promise.all(paths.map((it) => parse(it))))
    .then((parsedPosts) =>
      Promise.all([
        fs.writeFile(
          packageRoot('out/posts/index.json'),
          JSON.stringify(parsedPosts.map((parsedPost) => parsedPost.meta)),
        ),
        ...parsedPosts.map(async ({ content, meta }) => {
          return fs.writeFile(
            packageRoot('out/posts', `${meta.slug}.json`),
            JSON.stringify({ content: await compile(content).then(minify), meta }),
          )
        }),
      ]),
    )

  console.log('Done compiling posts.')
}
