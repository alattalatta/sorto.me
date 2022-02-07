import type { DocMetadata } from '@app/docs'
import { Doc } from '@app/docs'
import docsIndex from '@app/docs/data/index.json'
import { compile, useMDXRenderer } from '@app/mdx'
import { DocumentBody } from '@app/ui'
import browserCompatData from '@mdn/browser-compat-data'
import type { Identifier } from '@mdn/browser-compat-data/types'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import { DOCS_MDX_COMPONENTS } from 'components/DocsMDX'
import { getCompatData } from 'utils/docs/browserCompat'
import type { Page } from 'utils/types'

type StaticParam = { slugs: string[] }
type StaticProps = {
  bcd: {
    data: Identifier
    name: string
  } | null
  compiledSource: string
  meta: DocMetadata
}

const Doc: Page<StaticProps> = ({ bcd, compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <>
      <Head>
        <title key="title">{meta.title} - Sorto.me Docs</title>
        {meta.description && <meta key="description" content={meta.description} name="description" />}
        <meta key="og:type" content="article" property="og:type" />
        <meta key="og:title" content={`${meta.title} - Sorto.me Docs`} property="og:title" />
        {meta.description && <meta key="og:description" content={meta.description} name="og:description" />}
        <meta key="article:modified_time" content={meta.updated} property="article:modified_time" />
      </Head>
      <DocumentBody>
        <Content bcd={bcd} components={DOCS_MDX_COMPONENTS} />
      </DocumentBody>
    </>
  )
}

export default Doc

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slugs) {
    throw new Error('Slugs must exist')
  }

  const { content, meta } = importDocData(params.slugs.join('/'))

  const bcd = makeBCDData(meta.bcd || null)
  const compiled = await compile(content)

  return {
    props: {
      bcd,
      compiledSource: compiled,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = () => {
  return {
    fallback: false,
    paths: docsIndex.map((doc) => ({ params: { slugs: doc.slug.split('/') } })),
  }
}

function makeBCDData(bcdKey: string | null): { data: Identifier; name: string } | null {
  if (!bcdKey) {
    return null
  }

  const data = getCompatData(browserCompatData, bcdKey)
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

function importDocData(slug: string): Doc {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(`@app/docs/data/${slug}.json`) as Doc
}
