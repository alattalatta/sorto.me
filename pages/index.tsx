import { promises as fs } from 'fs'
import path from 'path'

import { GetStaticProps } from 'next'

import BlogMenu from 'components/BlogMenu'
import { PostDatum } from 'components/BlogPostEntry'
import IndexBody from 'components/IndexBody'
import { getLayout } from 'components/Layout'
import { parsePost, POSTS_PATH, POST_FILES_PENDING } from 'utils/posts'
import { Page } from 'utils/types'

type StaticProps = { latestPost: PostDatum }

const Index: Page<StaticProps> = ({ latestPost }) => {
  return <IndexBody latestPost={latestPost} />
}
Index.getLayout = getLayout(<BlogMenu />)
export default Index

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const [postData] = await Promise.all(
    [...(await POST_FILES_PENDING)]
      .slice(-1)
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
      latestPost: postData,
    },
  }
}
