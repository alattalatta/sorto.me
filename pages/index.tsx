import fs from 'fs'
import path from 'path'
import util from 'util'

import { GetStaticProps } from 'next'
import Head from 'next/head'

import IndexBody, { PostDatum } from 'components/IndexBody'
import { getLayout } from 'components/Layout'
import { parsePost, POSTS_PATH, POST_FILES } from 'utils/post'
import { Page } from 'utils/types'

type StaticProps = { posts: readonly PostDatum[] }

const Index: Page<StaticProps> = ({ posts }) => {
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
Index.getLayout = getLayout
export default Index

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postData = await Promise.all(
    [...POST_FILES]
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
