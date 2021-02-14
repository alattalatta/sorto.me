import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { PostMetadata } from 'utils/posts'

import BlogFooter from './BlogFooter'
import BlogHero from './BlogHero'
import { MDX_COMPONENTS, MDXWrap } from './MDX'
import { Container } from './basics'

type Props = {
  children: MdxRemote.Source
  meta: PostMetadata
}
const BlogBody: React.VFC<Props> = ({ children, meta }) => {
  return (
    <article>
      <BlogHero meta={meta} />
      <Container>
        <MDXWrap components={MDX_COMPONENTS}>{children}</MDXWrap>
      </Container>
      <BlogFooter meta={meta} />
    </article>
  )
}

export default BlogBody
