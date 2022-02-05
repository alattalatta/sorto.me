import type { PostMetadata } from '@app/posts'
import postIndex from '@app/posts/data/index.json'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import { Anchor } from 'components/basics'
import type { Page } from 'utils/types'

type StaticProps = { posts: readonly PostMetadata[] }

const Blog: Page<StaticProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title key="title">Blog - sorto.me</title>
        <meta key="description" content="블로그" />
        <meta key="og:title" content="sorto.me - blog" property="og:title" />
        <meta key="og:description" content="블로그" property="og:description" />
      </Head>
      <main>
        {posts.map((post) => (
          <Anchor key={post.slug} href={`/posts/${post.slug}`} style={{ display: 'block' }}>
            {post.title}
          </Anchor>
        ))}
      </main>
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
