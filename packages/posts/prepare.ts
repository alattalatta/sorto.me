import { promises as fs } from 'fs'
import path from 'path'

import del from 'del'

import { parse } from './parse'

const relative = path.join.bind(null, __dirname)

del('data/*.json')
  .then(() => fs.readdir(relative('mdx')))
  .then((paths) => paths.filter((it) => it.endsWith('.mdx')))
  .then((paths) => paths.reverse().map((it) => relative('mdx', it)))
  .then((paths) => Promise.all(paths.map((it) => parse(it))))
  .then((parsedPosts) =>
    Promise.all([
      fs.writeFile(relative('data/index.json'), JSON.stringify(parsedPosts.map((parsedPost) => parsedPost.meta))),
      ...parsedPosts.map((parsedPost) =>
        fs.writeFile(relative('data', `${parsedPost.meta.slug}.json`), JSON.stringify(parsedPost)),
      ),
    ]),
  )
  .catch(console.error)
