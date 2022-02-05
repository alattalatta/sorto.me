import { promises as fs } from 'fs'
import path from 'path'

import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import type { PostDatum } from 'components/BlogPostEntry'
import { parsePost, POSTS_PATH, POST_FILES_PENDING } from 'utils/posts'
import type { Page } from 'utils/types'

type StaticProps = { posts: readonly PostDatum[] }

const Blog: Page<StaticProps> = ({ posts }) => {
  return (
    <Head>
      <title key="title">Blog - sorto.me</title>
      <meta key="description" content="블로그" />
      <meta key="og:title" content="sorto.me - blog" property="og:title" />
      <meta key="og:description" content="블로그" property="og:description" />
    </Head>
  )
}

export default Blog

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postData = await Promise.all(
    [...(await POST_FILES_PENDING)]
      .reverse()
      .map((fileName) => [fileName, path.join(POSTS_PATH, fileName)])
      .map(async ([fileName, filePath]) => {
        const source = await fs.readFile(filePath)

        const { meta } = await parsePost(filePath, source)

        return {
          meta,
          slug: fileName.replace('.mdx', ''),
        }
      }),
  )

  return {
    props: {
      posts: postData,
    },
  }
}
