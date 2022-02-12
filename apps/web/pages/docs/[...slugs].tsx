import type { DocMetadata } from '@app/docs'
import type { Doc } from '@app/docs'
import docsIndex from '@app/docs/data/index.json'
import docsMap from '@app/docs/data/slugMap.json'
import browserCompatData from '@mdn/browser-compat-data'
import type { Identifier } from '@mdn/browser-compat-data/types'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import DocBody from 'components/DocBody'
import { Layout } from 'components/Layout'
import { getCompatData } from 'utils/docs/browserCompat'
import type { Page } from 'utils/types'

type StaticParam = { slugs: string[] }
type StaticProps = {
  bcd: {
    data: Identifier
    name: string
  } | null
  breadcrumbs: (readonly [title: string, path: string])[]
  compiledSource: string
  meta: DocMetadata
}

const DocPage: Page<StaticProps> = ({ bcd, breadcrumbs, compiledSource, meta }) => {
  return (
    <>
      <Head>
        <title key="title">{meta.title} - Sorto.me Docs</title>
        {meta.description && <meta key="description" content={meta.description} name="description" />}
        <meta key="og:type" content="article" property="og:type" />
        <meta key="og:title" content={`${meta.title} - Sorto.me Docs`} property="og:title" />
        {meta.description && <meta key="og:description" content={meta.description} name="og:description" />}
        <meta key="article:modified_time" content={meta.updated} property="article:modified_time" />
        <link
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/base16/github.min.css"
          rel="stylesheet"
        />
      </Head>
      <DocBody bcd={bcd} breadcrumbs={breadcrumbs} compiledSource={compiledSource} meta={meta} />
    </>
  )
}
DocPage.Layout = Layout

export default DocPage

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slugs) {
    throw new Error('Slugs must exist')
  }

  const { content, meta } = importDocData(params.slugs.join('/'))

  const bcd = makeBCDData(meta.bcd || null)

  return {
    props: {
      bcd,
      breadcrumbs: meta.slug
        .split('/')
        .slice(0, -1) // exclude current doc path
        .reduce<{ breadcrumbs: StaticProps['breadcrumbs']; combinedPath: string }>(
          ({ breadcrumbs, combinedPath }, cur) => {
            const path = `${combinedPath}/${cur}`
            const title = docsMap[path.slice(1) /* remove leading slash */] || cur

            return { breadcrumbs: [...breadcrumbs, [title, path]], combinedPath: path }
          },
          { breadcrumbs: [], combinedPath: '' },
        ).breadcrumbs,
      compiledSource: content,
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
