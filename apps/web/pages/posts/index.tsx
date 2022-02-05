import type { PostMetadata } from '@app/posts'
import postIndex from '@app/posts/data/index.json'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import PostsBody from 'components/PostsBody'
import type { Page } from 'utils/types'

type StaticProps = { posts: readonly PostMetadata[] }

const Blog: Page<StaticProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title key="title">Blog - sorto.me</title>
        <meta key="og:title" content="sorto.me - blog" property="og:title" />
      </Head>
      <PostsBody posts={posts} />
    </>
  )
}

export default Blog

export const getStaticProps: GetStaticProps<StaticProps> = () => {
  return {
    props: {
      posts: postIndex,
    },
  }
}
