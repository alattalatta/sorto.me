import fs from 'fs'
import path from 'path'
import util from 'util'

import matter from 'gray-matter'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import IndexBody, { PostDatum } from 'components/IndexBody'
import { getLayout } from 'components/Layout'
import { POSTS_PATH, POST_FILES } from 'utils/post'
import { Page } from 'utils/types'

type StaticProps = { posts: readonly PostDatum[] }

const Index: Page<StaticProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title key="title">Home</title>
      </Head>
      <IndexBody posts={posts} />
    </div>
  )
}
Index.getLayout = getLayout
export default Index

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postData = await Promise.all(
    POST_FILES.map((fileName) => [fileName, path.join(POSTS_PATH, fileName)]).map(async ([fileName, filePath]) => {
      const source = await util.promisify(fs.readFile)(filePath)

      const { data } = matter(source)

      return {
        data,
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
