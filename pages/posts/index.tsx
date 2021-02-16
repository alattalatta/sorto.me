import { promises as fs } from 'fs'
import path from 'path'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import BlogListBody, { PostDatum } from 'components/BlogListBody'
import BlogMenu from 'components/BlogMenu'
import Brand from 'components/Brand'
import { getLayout } from 'components/Layout'
import { parsePost, POSTS_PATH, POST_FILES_PENDING } from 'utils/posts'
import { Page } from 'utils/types'

type StaticProps = { posts: readonly PostDatum[] }

const Blog: Page<StaticProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title key="title">Blog - Sorto.me</title>
        <meta key="description" content="이것저것 블로그" />
        <meta key="og:title" property="og:title" content="Sorto.me - Blog" />
        <meta key="og:description" property="og:description" content="이것저것 블로그" />
      </Head>
      <BlogListBody posts={posts} />
    </div>
  )
}
Blog.getLayout = getLayout(<BlogMenu />, <Brand />)
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
