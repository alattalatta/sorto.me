import { promises as fs } from 'fs'
import path from 'path'
import util from 'util'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import BlogBody, { PostDatum } from 'components/BlogBody'
import BlogHeader from 'components/BlogHeader'
import { getLayout } from 'components/Layout'
import { parsePost, POSTS_PATH, POST_FILES_PENDING } from 'utils/posts'
import { Page } from 'utils/types'

type StaticProps = { posts: readonly PostDatum[] }

const Post: Page<StaticProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title key="title">Blog - Sorto.me</title>
        <meta key="description" content="이것저것 블로그" />
        <meta key="og:title" property="og:title" content="Sorto.me - Blog" />
        <meta key="og:description" property="og:description" content="이것저것 블로그" />
      </Head>
      <BlogBody posts={posts} />
    </div>
  )
}
Post.getLayout = getLayout(<BlogHeader />)
export default Post

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
