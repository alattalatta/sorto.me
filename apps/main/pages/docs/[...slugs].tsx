import type { Doc, DocMetadata, DocPageProps } from '@domain/docs'
import { DocPage, getCompatData } from '@domain/docs'
import type { Page } from '@lib/ui'
import browserCompatData from '@mdn/browser-compat-data'
import type { Identifier } from '@mdn/browser-compat-data'
import type { GetStaticPaths, GetStaticProps } from 'next'
import useSWR from 'swr'

import docsIndex from '../../out/docs/index.json'
import docsMap from '../../out/docs/slugMap.json'
import '../../styles/document-body.css'

type StaticParam = { slugs: string[] }

const DocPageWrap: Page<DocPageProps> = ({ compiledSource, meta, ...props }) => {
  const { data } = useSWR<{ compiledSource: string; meta: DocMetadata }>(
    `/api/doc?slug=${meta.slug}`,
    (key: string) => fetch(key).then((res) => res.json()),
    {
      fallbackData: { compiledSource, meta },
      refreshInterval: 2000,
      isPaused: () => process.env.NODE_ENV === 'production',
    },
  )

  return <DocPage {...props} compiledSource={data?.compiledSource || compiledSource} meta={data?.meta || meta} />
}
DocPageWrap.Layout = DocPage.Layout

export default DocPageWrap

export const getStaticProps: GetStaticProps<DocPageProps, StaticParam> = async ({ params }) => {
  if (!params?.slugs) {
    throw new Error('Slugs must exist')
  }

  const { content, meta } = await importDocData(params.slugs.join('/'))

  const bcd = makeBCDData(meta.bcd || null)

  return {
    props: {
      bcd,
      breadcrumbs: meta.slug
        .split('/')
        .slice(0, -1) // exclude current doc path
        .reduce<{ breadcrumbs: DocPageProps['breadcrumbs']; combinedPath: string }>(
          ({ breadcrumbs, combinedPath }, cur) => {
            const path = `${combinedPath}/${cur}`
            const title = (docsMap as Record<string, string>)[path.slice(1) /* remove leading slash */] || cur

            return { breadcrumbs: [...breadcrumbs, [title, path]], combinedPath: path }
          },
          { breadcrumbs: [], combinedPath: '' },
        ).breadcrumbs,
      compiledSource: content,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<StaticParam> = () => {
  return {
    fallback: false,
    paths: docsIndex.map((doc) => ({ params: { slugs: doc.slug.split('/') } })),
  }
}

function makeBCDData(bcdKey: string | null): { data: Identifier; name: string } | null {
  if (!bcdKey) {
    return null
  }

  const data = getCompatData(browserCompatData, bcdKey)
  if (!data) {
    return null
  }

  const keys = bcdKey.split('.')
  const name = keys[keys.length - 1]

  return {
    data,
    name,
  }
}

function importDocData(slug: string): Promise<Doc> {
  return import(`../../out/docs/${slug}.json`) as Promise<Doc>
}
