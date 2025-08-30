import fs from 'node:fs/promises'
import path from 'node:path'

import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import { Resvg } from '@resvg/resvg-js'
import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro'
import { getCollection } from 'astro:content'
import { doJSX } from 'gen/posts/og'
import satori from 'satori'
import sharp from 'sharp'

export const getStaticPaths = (async () => {
  return (await getCollection('posts')).map((entry) => ({
    params: { slug: entry.id },
    props: entry,
  }))
}) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>

const workspaceRoot = (await findWorkspaceDir(process.cwd())) || process.cwd()
const appRoot = path.join(workspaceRoot, 'apps/main/src')

const fontOrbit = await fs.readFile(path.join(appRoot, 'gen/orbit.ttf'))

export const GET: APIRoute<Props> = async ({ props }) => {
  const { description, title } = props.data
  const imageBuffer = (
    await sharp(await fs.readFile(path.join(appRoot, 'markdowns/posts', props.id, 'cover.png')))
      .resize(768 * 2)
      .toBuffer()
  ).buffer

  const svg = await satori(doJSX(title, description, imageBuffer), {
    fonts: [
      {
        data: fontOrbit,
        name: 'Orbit',
        weight: 400,
      },
    ],
    height: 400,
    width: 800,
  })
  const png = new Resvg(svg, {}).render().asPng()

  return new Response(Buffer.from(png).buffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
