import fs from 'fs'
import path from 'path'

import rehypePrism from '@mapbox/rehype-prism'
import { GetStaticPaths, GetStaticProps } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import Head from 'next/head'
import React from 'react'

import { getLayout } from 'components/Layout'
import PostBody, { mdxComponents } from 'components/PostBody'
import PostHero from 'components/PostHero'
import { parsePost, PostMetadata, POSTS_PATH, POST_FILES } from 'utils/post'
import { Page } from 'utils/types'

type StaticParam = { slug: string }
type StaticProps = { body: MdxRemote.Source; meta: PostMetadata }

const Post: Page<StaticProps> = ({ body, meta }) => {
  return (
    <article>
      <Head>
        <title key="title">{meta.title}</title>
      </Head>
      <PostHero created={meta.created} excerpt={meta.excerpt} title={meta.title} />
      <PostBody>{body}</PostBody>
    </article>
  )
}
Post.getLayout = getLayout
export default Post

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('Slug must exist')
  }

  const filePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(filePath)

  const { content, meta } = parsePost(params.slug, source)

  const mdxOptions = { rehypePlugins: [rehypePrism] }
  const body = await renderToString(content, { components: mdxComponents, mdxOptions, scope: meta })

  return {
    props: {
      body,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = () => {
  return Promise.resolve({
    fallback: false,
    paths: POST_FILES.map((path) => path.replace('.mdx', '')).map((slug) => ({
      params: { slug },
    })),
  })
}
