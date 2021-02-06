import { promises as fs } from 'fs'
import path from 'path'

import rehypePrism from '@mapbox/rehype-prism'
import { GetStaticPaths, GetStaticProps } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import Head from 'next/head'
import React from 'react'

import DocBody from 'components/DocBody'
import { getLayout } from 'components/Layout'
import { MDX_COMPONENTS } from 'components/MDX'
import { DocMetadata, DOCS_PATH, getDocFiles, parseDoc } from 'utils/docs'
import { Page } from 'utils/types'

type StaticParam = { slugs: string[] }
type StaticProps = { body: MdxRemote.Source; meta: DocMetadata; slugs: string[] }

const Doc: Page<StaticProps> = ({ body, meta, slugs }) => {
  return (
    <>
      <Head>
        <title key="title">{meta.title} - Sorto.me Docs</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${meta.title} - Sorto.me Docs`} />
        {meta.excerpt && <meta property="og:description" content={meta.excerpt} />}
      </Head>
      <DocBody meta={meta} slugs={slugs}>
        {body}
      </DocBody>
    </>
  )
}
Doc.getLayout = getLayout

export default Doc

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slugs) {
    throw new Error('Slugs must exist')
  }

  const filePath = path.join(DOCS_PATH, `${params.slugs.join('/')}.mdx`)
  const source = await fs.readFile(filePath)

  const { content, meta } = await parseDoc(filePath, source)

  const mdxOptions = { rehypePlugins: [rehypePrism] }
  const body = await renderToString(content, { components: MDX_COMPONENTS, mdxOptions, scope: meta })

  return {
    props: {
      body,
      meta,
      slugs: params.slugs,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = async () => {
  return {
    fallback: false,
    paths: (await getDocFiles())
      .map((path) => path.replace('.mdx', ''))
      .map((path) => ({ params: { slugs: path.split('/') } })),
  }
}
