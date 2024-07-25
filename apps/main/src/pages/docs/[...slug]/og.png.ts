import fs from 'node:fs/promises'
import path from 'node:path'

import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import { Resvg } from '@resvg/resvg-js'
import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro'
import { getCollection } from 'astro:content'
import { doJSX } from 'gen/docs/og'
import type { Root } from 'mdast'
import { remark } from 'remark'
import satori from 'satori'
import stripMarkdown from 'strip-markdown'
import { select } from 'unist-util-select'

export const getStaticPaths = (async () => {
  return (await getCollection('docs')).map((entry) => ({
    params: { slug: entry.id.replace('.mdx', '') },
    props: entry,
  }))
}) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>

const firstParagraphProcessor = remark()
  .use(() => (root: Root) => select('paragraph', root) || root.children[0] || root)
  .use(stripMarkdown)

const workspaceRoot = (await findWorkspaceDir(process.cwd())) || process.cwd()
const appRoot = path.join(workspaceRoot, 'apps/main/src')

const fontOrbit = await fs.readFile(path.join(appRoot, 'gen/orbit.ttf'))
const fontNGC = await fs.readFile(path.join(appRoot, 'gen/ngc.ttf'))

export const GET: APIRoute<Props> = async ({ props: { body, data } }) => {
  const description =
    data.description ??
    (await firstParagraphProcessor.process(body).then((res) => String(res).trim().replace(/\\/g, ''))) ??
    ''

  const svg = await satori(doJSX(data.title, description), {
    fonts: [
      {
        data: fontOrbit,
        name: 'Orbit',
        weight: 400,
      },
      {
        data: fontNGC,
        name: 'Nanum Gothic Coding',
        weight: 400,
      },
    ],
    height: 400,
    width: 800,
  })
  const png = new Resvg(svg).render().asPng()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
