import type { PostMetadata } from '@app/posts'
import { Footer, Post, ScrollBack, SCROLL_BACK_HEIGHT, styled } from '@app/ui'
import { motion as m } from 'framer-motion'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'

import { easeStandard } from 'utils/styler'

import { MDX_COMPONENTS, MDXWrap, MDX_SCOPE } from './MDX'

type Props = {
  children: MDXRemoteSerializeResult
  meta: PostMetadata
}

const Root = styled('article', {
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
  padding: `0 1rem ${SCROLL_BACK_HEIGHT}rem`,
  paddingBottom: `calc(env(safe-area-inset-bottom) + ${SCROLL_BACK_HEIGHT}rem)`,
})

const Body = styled(m.div, {
  marginTop: '1.5rem',
})

const ScrollBack768 = styled(ScrollBack, {
  maxWidth: `${768 / 16}rem`,
})

const BlogBody: React.VFC<Props> = ({ children, meta }) => {
  return (
    <Root>
      <Post as="header" image={meta.image} title={meta.title} written={new Date(meta.created)} />
      <Body
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.2,
          opacity: easeStandard(0.25),
          y: easeStandard(0.5),
        }}
      >
        <MDXWrap components={MDX_COMPONENTS} scope={MDX_SCOPE}>
          {children}
        </MDXWrap>
      </Body>
      <Footer updated={new Date(meta.updated)} />
      <ScrollBack768 />
    </Root>
  )
}

export default BlogBody
