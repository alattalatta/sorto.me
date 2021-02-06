import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { PostMetadata } from 'utils/posts'

import { MDX_COMPONENTS, MDXWrap } from './MDX'
import styles from './PostBody.module.scss'
import PostFooter from './PostFooter'
import PostHero from './PostHero'
import { Container } from './basics'

type Props = {
  children: MdxRemote.Source
  meta: PostMetadata
}

const PostBody: React.VFC<Props> = ({ children, meta }) => {
  const content = hydrate(children, { components: MDX_COMPONENTS })

  return (
    <article>
      <PostHero meta={meta} />
      <Container>
        <MDXWrap className={styles.prismStyler}>{content}</MDXWrap>
      </Container>
      <PostFooter meta={meta} />
    </article>
  )
}

export default PostBody
