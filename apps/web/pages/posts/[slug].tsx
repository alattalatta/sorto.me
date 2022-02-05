import type { Post, PostMetadata } from '@app/posts'
import postIndex from '@app/posts/data/index.json'
import rehypePrism from '@mapbox/rehype-prism'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import React from 'react'

import BlogBody from 'components/BlogBody'
import BlogMenu from 'components/BlogMenu'
import Brand from 'components/Brand'
import { getLayout } from 'components/Layout'
import type { Page } from 'utils/types'

type StaticParam = { slug: string }
type StaticProps = { body: MDXRemoteSerializeResult; meta: PostMetadata }

const BlogPost: Page<StaticProps> = ({ body, meta }) => {
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
      <BlogBody meta={meta}>{body}</BlogBody>
    </>
  )
}
BlogPost.getLayout = getLayout(<BlogMenu />, <Brand brightness="light" />, { brightness: 'dark' })
export default BlogPost

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('Slug must exist')
  }

  const { content, meta } = await importPostData(params.slug)

  const mdxOptions = { rehypePlugins: [rehypePrism] }
  const body = await serialize(content, { mdxOptions, scope: meta })

  return {
    props: {
      body,
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
