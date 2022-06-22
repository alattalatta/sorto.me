import { useMDXRenderer } from '@lib/mdx'
import type { Page } from '@lib/ui'
import { Anchor, Footer, Layout } from '@lib/ui'
import * as documentBody from '@lib/ui/documentBody.css'
import Head from 'next/head'
import Image from 'next/image'

import { Post } from './Post'
import * as styles from './PostPage.css'
import { SideBySide } from './SideBySide'
import type { PostMetadata } from './types'

type Props = { compiledSource: string; meta: PostMetadata }

const PostPage: Page<Props> = ({ compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <>
      <Head>
        <title key="title">{`${meta.title} - sorto.me`}</title>
        {meta.description && <meta key="description" content={meta.description} name="description" />}
        <meta key="og:type" content="article" property="og:type" />
        <meta key="og:title" content={`${meta.title} - sorto.me`} property="og:title" />
        {meta.description && <meta key="og:description" content={meta.description} property="og:description" />}
        {meta.image && <meta key="og:image" content={meta.image} property="og:image" />}
        <meta key="article:published_time" content={meta.created} property="article:published_time" />
        <meta key="article:modified_time" content={meta.updated} property="article:modified_time" />
      </Head>
      <main className={styles.root}>
        <article>
          <Post as="header" image={meta.image} title={meta.title} written={new Date(meta.created)} />
          <div className={styles.body}>
            <div className={documentBody.root}>
              <Content
                components={{
                  a: Anchor,
                  img: Image,
                  SideBySide,
                }}
              />
            </div>
          </div>
          <Footer updated={new Date(meta.updated)} />
        </article>
      </main>
    </>
  )
}
PostPage.Layout = Layout

export type { Props }
export { PostPage }
