import { compile, useMDXRenderer } from '@app/mdx'
import { Post } from '@app/posts'
import type { PostMetadata } from '@app/posts'
import postIndex from '@app/posts/data/index.json'
import { DocumentBody } from '@app/ui'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import { MDX_COMPONENTS } from 'components/MDX'
import type { Page } from 'utils/types'

type StaticParam = { slug: string }
type StaticProps = { compiledSource: string; meta: PostMetadata }

const Post: Page<StaticProps> = ({ compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <>
      <Head>
        <title key="title">{meta.title} - Sorto.me</title>
        {meta.description && <meta key="description" content={meta.description} name="description" />}
        <meta key="og:type" content="article" property="og:type" />
        <meta key="og:title" content={`${meta.title} - Sorto.me`} property="og:title" />
        {meta.description && <meta key="og:description" content={meta.description} property="og:description" />}
        {meta.image && <meta key="og:image" content={meta.image} property="og:image" />}
        <meta key="article:published_time" content={meta.created} property="article:published_time" />
        <meta key="article:modified_time" content={meta.updated} property="article:modified_time" />
      </Head>
      <DocumentBody>
        <Content components={MDX_COMPONENTS} />
      </DocumentBody>
    </>
  )
}

export default Post

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('Slug must exist')
  }

  const { content, meta } = await importPostData(params.slug)

  const compiled = await compile(content)

  return {
    props: {
      compiledSource: compiled,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = () => {
  return {
    fallback: false,
    paths: postIndex.map((post) => ({ params: { slug: post.slug } })),
  }
}

function importPostData(slug: string): Promise<Post> {
  return import(`@app/posts/data/${slug}.json`) as Promise<Post>
}
