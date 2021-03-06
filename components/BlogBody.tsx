import { motion as m } from 'framer-motion'
import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { PostMetadata } from 'utils/posts'
import { easeStandard } from 'utils/styler'

import BlogFooter from './BlogFooter'
import BlogHero from './BlogHero'
import { MDX_COMPONENTS, MDXWrap } from './MDX'
import TableOfContent from './TableOfContent'
import { Container } from './basics'

type Props = {
  children: MdxRemote.Source
  meta: PostMetadata
}
const BlogBody: React.VFC<Props> = ({ children, meta }) => {
  return (
    <article>
      <BlogHero meta={meta} />
      <Container
        as={m.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          opacity: easeStandard(0.25),
          y: easeStandard(0.5),
        }}
      >
        <TableOfContent />
        <MDXWrap components={MDX_COMPONENTS}>{children}</MDXWrap>
      </Container>
      <BlogFooter meta={meta} />
    </article>
  )
}

export default BlogBody
