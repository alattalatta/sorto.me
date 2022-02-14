import type { DocMetadata } from '@contents/docs'
import { useMDXRenderer } from '@lib/mdx'
import type { Page } from '@lib/ui'
import { DocumentBody, Footer, Layout, styled, Title } from '@lib/ui'
import type { Identifier } from '@mdn/browser-compat-data/types'
import Head from 'next/head'

import { DOCS_MDX_COMPONENTS } from './DocsMDX'

type Props = {
  bcd: {
    data: Identifier
    name: string
  } | null
  breadcrumbs: (readonly [title: string, path: string])[]
  compiledSource: string
  meta: DocMetadata
}

const Body = styled('div', {
  marginTop: '2rem',
})

const DocPage: Page<Props> = ({ bcd, breadcrumbs, compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <>
      <Head>
        <title key="title">{meta.title} - sorto.me docs</title>
        {meta.description && <meta key="description" content={meta.description} name="description" />}
        <meta key="og:type" content="article" property="og:type" />
        <meta key="og:title" content={`${meta.title} - Sorto.me Docs`} property="og:title" />
        {meta.description && <meta key="og:description" content={meta.description} name="og:description" />}
        <meta key="article:modified_time" content={meta.updated} property="article:modified_time" />
      </Head>
      <main>
        <Title breadcrumbs={breadcrumbs} title={meta.title} />
        <Body>
          <DocumentBody>
            <Content bcd={bcd} components={DOCS_MDX_COMPONENTS} />
          </DocumentBody>
        </Body>
        <Footer mdnSlug={meta.slug} updated={new Date(meta.updated)} />
      </main>
    </>
  )
}
DocPage.Layout = Layout

export type { Props as DocPageProps }
export { DocPage }

export { getCompatData } from './utils'
