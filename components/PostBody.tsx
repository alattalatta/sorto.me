import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { PostMetadata } from 'utils/posts'

import { Container } from './Container'
import styles from './PostBody.module.scss'
import PostFooter from './PostFooter'
import PostHero from './PostHero'
import { mdxComponents, MDXWrap } from './mdxCommons'

type Props = {
  children: MdxRemote.Source
  meta: PostMetadata
}

const PostBody: React.VFC<Props> = ({ children, meta }) => {
  const content = hydrate(children, { components: mdxComponents })

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
