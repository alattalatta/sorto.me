import fs from 'fs'
import path from 'path'

import rehypePrism from '@mapbox/rehype-prism'
import { GetStaticPaths, GetStaticProps } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import Head from 'next/head'
import React from 'react'

import BlogHeader from 'components/BlogHeader'
import { getLayout } from 'components/Layout'
import { MDX_COMPONENTS } from 'components/MDX'
import PostBody from 'components/PostBody'
import { parsePost, PostMetadata, POSTS_PATH, POST_FILES_PENDING } from 'utils/posts'
import { Page } from 'utils/types'

type StaticParam = { slug: string }
type StaticProps = { body: MdxRemote.Source; meta: PostMetadata }

const Post: Page<StaticProps> = ({ body, meta }) => {
  return (
    <>
      <Head>
        <title key="title">{meta.title} - Sorto.me</title>
        <meta key="description" name="description" content={meta.excerpt} />
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:title" property="og:title" content={`${meta.title} - Sorto.me`} />
        <meta key="og:description" property="og:description" content={meta.excerpt} />
        <meta key="article:published_time" property="article:published_time" content={meta.created} />
      </Head>
      <PostBody meta={meta}>{body}</PostBody>
    </>
  )
}
Post.getLayout = getLayout(<BlogHeader brightness="dark" />)
export default Post

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('Slug must exist')
  }

  const filePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(filePath)

  const { content, meta } = parsePost(params.slug, source)

  const mdxOptions = { rehypePlugins: [rehypePrism] }
  const body = await renderToString(content, { components: MDX_COMPONENTS, mdxOptions, scope: meta })

  return {
    props: {
      body,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = async () => {
  return {
    fallback: false,
    paths: (await POST_FILES_PENDING)
      .map((path) => path.replace('.mdx', ''))
      .map((slug) => ({
        params: { slug },
      })),
  }
}
