import { GetStaticPaths, GetStaticProps } from 'next'

import { getLayout } from 'components/Layout'
import { getDocFiles } from 'utils/post'
import { Page } from 'utils/types'

type StaticProps = { slugs: string[] }
type StaticParam = { slugs: string[] }

const Doc: Page<StaticProps> = ({ slugs }) => {
  return (
    <div>
      {slugs.map((slug) => (
        <p key={slug}>{slug}</p>
      ))}
    </div>
  )
}
Doc.getLayout = getLayout

export default Doc

export const getStaticProps: GetStaticProps<StaticProps, StaticParam> = async ({ params }) => {
  return {
    props: {
      slugs: params?.slugs || [],
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = async () => {
  const a = (await getDocFiles())
    .map((path) => path.replace('.mdx', ''))
    .map((path) => ({ params: { slugs: path.split('/') } }))
  console.dir(a, { depth: Infinity })
  return {
    fallback: false,
    paths: (await getDocFiles())
      .map((path) => path.replace('.mdx', ''))
      .map((path) => ({ params: { slugs: path.split('/') } })),
  }
}
