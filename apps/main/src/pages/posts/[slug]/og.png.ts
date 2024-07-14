import fs from 'node:fs/promises'
import path from 'node:path'

import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro'
import { getCollection } from 'astro:content'
import satori from 'satori'
import sharp from 'sharp'

import { doJSX } from './_og'

export const getStaticPaths = (async () => {
  return (await getCollection('posts')).map((entry) => ({
    params: { slug: entry.slug },
    props: entry,
  }))
}) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>

const workspaceRoot = (await findWorkspaceDir(process.cwd())) || process.cwd()
const appRoot = path.join(workspaceRoot, 'apps/main/src')
const postRoot = path.join(appRoot, 'pages/posts/[slug]')

const font = await fs.readFile(path.join(postRoot, '_orbit.ttf'))

export const GET: APIRoute<Props> = async ({ props }) => {
  const { description, title } = props.data
  const imageBuffer = await fs.readFile(path.join(appRoot, 'content/posts', props.slug, 'cover.png'))

  const svg = await satori(doJSX(title, description, imageBuffer.buffer), {
    fonts: [
      {
        data: font,
        name: 'Orbit',
        weight: 400,
      },
    ],
    height: 400,
    width: 800,
  })
  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
