import type { PostMetadata } from '@contents/posts'
import { useMDXRenderer } from '@lib/mdx'
import type { Page } from '@lib/ui'
import { Layout } from '@lib/ui'
import { Anchor, DocumentBody, Footer, ScrollBack, styled } from '@lib/ui'
import { m } from 'framer-motion'
import type { Easing, Tween } from 'framer-motion/types/types'
import Head from 'next/head'

import { Post } from './Post'

type Props = { compiledSource: string; meta: PostMetadata }

const Root = styled('article', {
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
})

const Body = styled(m.div, {
  marginTop: '1.5rem',
})

const ScrollBack768 = styled(ScrollBack, {
  maxWidth: `${768 / 16}rem`,
})

export const STANDARD_EASE: Easing = [0.4, 0, 0.2, 1]

/** Returns a standard easing definition object. */
export function easeStandard(duration: number): Tween {
  return {
    type: 'tween',
    ease: STANDARD_EASE,
    duration,
  }
}

const PostPage: Page<Props> = ({ compiledSource, meta }) => {
  const Content = useMDXRenderer(compiledSource)

  return (
    <>
      <Head>
        <title key="title">{meta.title} - sorto.me</title>
        {meta.description && <meta key="description" content={meta.description} name="description" />}
        <meta key="og:type" content="article" property="og:type" />
        <meta key="og:title" content={`${meta.title} - Sorto.me`} property="og:title" />
        {meta.description && <meta key="og:description" content={meta.description} property="og:description" />}
        {meta.image && <meta key="og:image" content={meta.image} property="og:image" />}
        <meta key="article:published_time" content={meta.created} property="article:published_time" />
        <meta key="article:modified_time" content={meta.updated} property="article:modified_time" />
      </Head>
      <Root>
        <Post as="header" image={meta.image} title={meta.title} written={new Date(meta.created)} />
        <Body
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{
            delay: 0.25,
            opacity: easeStandard(0.25),
            y: easeStandard(0.5),
          }}
        >
          <DocumentBody>
            <Content
              components={{
                a: Anchor,
              }}
            />
          </DocumentBody>
        </Body>
        <Footer updated={new Date(meta.updated)} />
        <ScrollBack768 />
      </Root>
    </>
  )
}
PostPage.Layout = Layout

export type { Props }
export { PostPage }
