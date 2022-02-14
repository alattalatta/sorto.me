import type { PostMetadata } from '@contents/posts'
import postIndex from '@contents/posts/data/index.json'
import { Layout } from '@lib/ui'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

import PostsBody from 'components/PostsBody'
import type { Page } from 'utils/types'

type StaticProps = { posts: readonly PostMetadata[] }

const PostsPage: Page<StaticProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title key="title">blog - sorto.me</title>
        <meta key="og:title" content="sorto.me - blog" property="og:title" />
      </Head>
      <PostsBody posts={posts} />
    </>
  )
}
PostsPage.Layout = Layout

export default PostsPage

export const getStaticProps: GetStaticProps<StaticProps> = () => {
  return {
    props: {
      posts: postIndex,
    },
  }
}
