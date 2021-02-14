import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { PostMetadata } from 'utils/posts'

import BlogFooter from './BlogFooter'
import { MDX_COMPONENTS, MDXWrap } from './MDX'
import PostHero from './PostHero'
import { Container } from './basics'

type Props = {
  children: MdxRemote.Source
  meta: PostMetadata
}

const PostBody: React.VFC<Props> = ({ children, meta }) => {
  return (
    <article>
      <PostHero meta={meta} />
      <Container>
        <MDXWrap components={MDX_COMPONENTS}>{children}</MDXWrap>
      </Container>
      <BlogFooter meta={meta} />
    </article>
  )
}

export default PostBody
