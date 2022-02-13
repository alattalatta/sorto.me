import type { Post } from '@contents/posts'
import type { PostMetadata } from '@contents/posts'
import postsIndex from '@contents/posts/data/index.json'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { Layout } from 'components/Layout'
import PostBody from 'components/PostBody'
import type { Page } from 'utils/types'

type StaticParam = { slug: string }
type StaticProps = { compiledSource: string; meta: PostMetadata }

const PostPage: Page<StaticProps> = ({ compiledSource, meta }) => {
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
        <link
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/base16/github.min.css"
          rel="stylesheet"
        />
      </Head>
      <PostBody compiledSource={compiledSource} meta={meta} />
    </>
  )
}

PostPage.Layout = ({ children }) => (
  <Layout topStrip={false} width={768}>
    {children}
  </Layout>
)

export default PostPage

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = ({ params }) => {
  if (!params?.slug) {
    throw new Error('Slug must exist')
  }

  const { content, meta } = importPostData(params.slug)

  return {
    props: {
      compiledSource: content,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = () => {
  return {
    fallback: false,
    paths: postsIndex.map((post) => ({ params: { slug: post.slug } })),
  }
}

function importPostData(slug: string): Post {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(`@contents/posts/data/${slug}.json`) as Post
}
