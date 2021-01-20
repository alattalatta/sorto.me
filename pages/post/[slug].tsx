import fs from 'fs'
import path from 'path'

import { GetStaticPaths, GetStaticProps } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'

import { getLayout } from 'components/Layout'
import { parsePost, PostMetadata, POSTS_PATH, POST_FILES } from 'utils/post'
import { Page } from 'utils/types'

type StaticParam = { slug: string }
type StaticProps = { body: string; meta: PostMetadata }

const Post: Page<StaticProps> = ({ body, meta }) => {
  const content = hydrate(body)

  return (
    <div>
      <Head>
        <title key="title">{meta.title}</title>
      </Head>
      {content}
    </div>
  )
}
Post.getLayout = getLayout
export default Post

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('Slug must exist')
  }

  const filePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(filePath)

  const { content, meta } = parsePost(params.slug, source)

  const body = await renderToString(content, { scope: meta })

  return {
    props: {
      body,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = () => {
  return Promise.resolve({
    fallback: false,
    paths: POST_FILES.map((path) => path.replace('.mdx', '')).map((slug) => ({
      params: { slug },
    })),
  })
}
