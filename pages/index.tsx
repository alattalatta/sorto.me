import fs from 'fs'
import path from 'path'
import util from 'util'

import matter from 'gray-matter'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { getLayout } from 'components/Layout'
import { POSTS_PATH, POST_FILES } from 'utils/post'
import { Page } from 'utils/types'

type StaticProps = { posts: readonly PostDatum[] }
type PostDatum = {
  data: Record<string, string>
  slug: string
}

const Index: Page<StaticProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title key="title">Home</title>
      </Head>
      {posts.map((post) => (
        <Link href={`/post/${post.slug}`}>
          <a>
            <p>{post.data.title}</p>
          </a>
        </Link>
      ))}
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
