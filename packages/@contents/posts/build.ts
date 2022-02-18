import { promises as fs } from 'fs'
import path from 'path'

import { compile } from '@lib/mdx/compiler'
import { remove } from 'fs-extra'

import { parse } from './parse'

const relative = path.join.bind(null, __dirname)

remove('data')
  .then(() => fs.mkdir(relative('data'), { recursive: true }))
  .then(() => fs.readdir(relative('mdx')))
  .then((paths) => paths.filter((it) => it.endsWith('.mdx')))
  .then((paths) => paths.reverse().map((it) => relative('mdx', it)))
  .then((paths) => Promise.all(paths.map((it) => parse(it))))
  .then((parsedPosts) =>
    Promise.all([
      fs.writeFile(relative('data/index.json'), JSON.stringify(parsedPosts.map((parsedPost) => parsedPost.meta))),
      fs.writeFile(relative('data/map.json'), JSON.stringify(parsedPosts.map((parsedPost) => parsedPost.meta.slug))),
      ...parsedPosts.map(async ({ content, meta }) => {
        return fs.writeFile(
          relative('data', `${meta.slug}.json`),
          JSON.stringify({ content: await compile(content), meta }),
        )
      }),
    ]),
  )
  .then(() => console.log('Done compiling posts.'))
  .catch(console.error)
