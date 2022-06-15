import { createRequire } from 'node:module'

import { parse } from '@domain/blog/parse'
import { compile } from '@lib/mdx/compiler'
import type { NextApiHandler } from 'next'

const require = createRequire(import.meta.url)

const handler: NextApiHandler = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return void res.status(405).end()
  }

  if (typeof req.query.slug !== 'string') {
    return void res.status(400).end()
  }

  const contentsPath = require.resolve(`@domain/blog/contents/${req.query.slug}.mdx`)

  try {
    const { content, meta } = await parse(contentsPath)

    res.status(200).json({
      compiledSource: await compile(content),
      meta,
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export default handler
