import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { PostMetadata } from 'utils/posts'

import { Container } from './Container'
import styles from './PostBody.module.scss'
import PostFooter from './PostFooter'
import PostHero from './PostHero'
import { Anchor } from './basics'
import { MDX_COMPONENTS, MDXWrap } from './mdxCommons'

type Props = {
  children: MdxRemote.Source
  meta: PostMetadata
}

export const POST_MDX_COMPONENTS: MdxRemote.Components = Object.freeze({
  ...MDX_COMPONENTS,
  a: ({ children, href }: JSX.IntrinsicElements['a']) => (
    <Anchor href={href} rel="noreferrer noopener" target="_blank">
      {children}
    </Anchor>
  ),
})

const PostBody: React.VFC<Props> = ({ children, meta }) => {
  const content = hydrate(children, { components: POST_MDX_COMPONENTS })

  return (
    <article>
      <PostHero created={meta.created} excerpt={meta.excerpt} title={meta.title} />
      <Container>
        <MDXWrap className={styles.prismStyler}>{content}</MDXWrap>
      </Container>
      <PostFooter />
    </article>
  )
}

export default PostBody
