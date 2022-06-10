import { useMDXRenderer } from '@lib/mdx'
import type { Page } from '@lib/ui'
import { Footer, Layout } from '@lib/ui'
import * as documentBody from '@lib/ui/documentBody.css'
import type { Identifier } from '@mdn/browser-compat-data'
import clsx from 'clsx'
import Head from 'next/head'

import * as styles from './DocPage.css'
import { DOCS_MDX_COMPONENTS } from './DocsMDX'
import { TableOfContents } from './TableOfContents'
import { Title } from './Title'
import type { DocMetadata } from './types'

type Props = {
  bcd: {
    data: Identifier
    name: string
  } | null
  breadcrumbs: (readonly [title: string, path: string])[]
  compiledSource: string
  meta: DocMetadata
}

const DocPage: Page<Props> = ({ bcd, breadcrumbs, compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <>
      <Head>
        <title key="title">{`${meta.title} - sorto.me docs`}</title>
        {meta.description && <meta key="description" content={meta.description} name="description" />}
        <meta key="og:type" content="article" property="og:type" />
        <meta key="og:title" content={`${meta.title} - sorto.me Docs`} property="og:title" />
        {meta.description && <meta key="og:description" content={meta.description} name="og:description" />}
        <meta key="article:modified_time" content={meta.updated} property="article:modified_time" />
      </Head>
      <main className={styles.grid}>
        {Boolean(meta.toc.length) && (
          <div className={styles.toc}>
            <TableOfContents data={meta.toc} title={meta.title} />
          </div>
        )}
        <article className={styles.article}>
          <Title breadcrumbs={breadcrumbs} title={meta.title} />
          <div className={clsx(styles.articleBody, documentBody.root)}>
            <Content bcd={bcd} components={DOCS_MDX_COMPONENTS} />
          </div>
          <Footer mdnSlug={meta.slug} updated={new Date(meta.updated)} />
        </article>
      </main>
    </>
  )
}
DocPage.Layout = Layout

export type { Doc, DocMetadata } from './types'
export type { Props as DocPageProps }
export { DocPage }
