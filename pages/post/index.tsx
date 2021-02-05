import fs from 'fs'
import path from 'path'
import util from 'util'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import IndexBody, { PostDatum } from 'components/IndexBody'
import { getLayout } from 'components/Layout'
import { parsePost, POSTS_PATH, POST_FILES_PENDING } from 'utils/posts'
import { Page } from 'utils/types'

type StaticProps = { posts: readonly PostDatum[] }

const Post: Page<StaticProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title key="title">Sorto.me</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sorto.me" />
      </Head>
      <IndexBody posts={posts} />
    </div>
  )
}
Post.getLayout = getLayout
export default Post

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postData = await Promise.all(
    [...(await POST_FILES_PENDING)]
      .reverse()
      .map((fileName) => [fileName, path.join(POSTS_PATH, fileName)])
      .map(async ([fileName, filePath]) => {
        const source = await util.promisify(fs.readFile)(filePath)

        const { meta } = parsePost(fileName, source)

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