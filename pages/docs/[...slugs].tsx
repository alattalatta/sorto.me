import { promises as fs } from 'fs'
import path from 'path'

import rehypePrism from '@mapbox/rehype-prism'
import bcd from '@mdn/browser-compat-data'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import React from 'react'

import Brand from 'components/Brand'
import DocBody from 'components/DocBody'
import DocMenu from 'components/DocMenu'
import { getLayout } from 'components/Layout'
import { DocMetadata, DOCS_PATH, getDocFiles, parseDoc } from 'utils/docs'
import { getCompatData } from 'utils/docs/browserCompat'
import { Page } from 'utils/types'

import type { Identifier } from '@mdn/browser-compat-data/types'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

type StaticParam = { slugs: string[] }
type StaticProps = {
  bcd: {
    data: Identifier
    name: string
  } | null
  body: MDXRemoteSerializeResult
  meta: DocMetadata
  slugs: string[]
}

const Doc: Page<StaticProps> = ({ bcd, body, meta, slugs }) => {
  return (
    <>
      <Head>
        <title key="title">{meta.title} - Sorto.me Docs</title>
        {meta.description && <meta key="description" name="description" content={meta.description} />}
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:title" property="og:title" content={`${meta.title} - Sorto.me Docs`} />
        {meta.excerpt && <meta key="og:description" name="og:description" content={meta.excerpt} />}
        <meta key="article:modified_time" property="article:modified_time" content={meta.updated} />
      </Head>
      <DocBody bcd={bcd} meta={meta} slugs={slugs}>
        {body}
      </DocBody>
    </>
  )
}
Doc.getLayout = getLayout(<DocMenu />, <Brand brightness="light" href="/docs" />, { brightness: 'dark' })

export default Doc

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slugs) {
    throw new Error('Slugs must exist')
  }

  const filePath = path.join(DOCS_PATH, `${params.slugs.join('/')}.mdx`)
  const source = await fs.readFile(filePath)

  const { content, meta } = await parseDoc(filePath, source)

  const bcd = makeBCDData(meta.bcd)

  const body = await serialize(content, { mdxOptions: { rehypePlugins: [rehypePrism] }, scope: { ...meta, bcd } })

  return {
    props: {
      bcd,
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

function makeBCDData(bcdKey: string | null): { data: Identifier; name: string } | null {
  if (!bcdKey) {
    return null
  }

  const data = getCompatData(bcd, bcdKey)
  if (!data) {
    return null
  }

  const keys = bcdKey.split('.')
  const name = keys[keys.length - 1]

  return {
    data,
    name,
  }
}
