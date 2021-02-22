import { motion as m, Variants } from 'framer-motion'
import React from 'react'

import { styled } from 'utils/styler'

import BlogPostEntry, { PostDatum } from './BlogPostEntry'
import { Anchor, Container as ContainerBase, NoScreen } from './basics'

const CONTAINER_VARIANTS: Variants = {
  initial: {},
  present: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.3,
    },
  },
}

const Container = styled(ContainerBase, {
  paddingTop: 48,
  paddingBottom: 72,
  when: {
    narrow: {
      paddingTop: 24,
    },
    tiny: {
      paddingTop: 0,
    },
  },
})

type Props = {
  posts: readonly PostDatum[]
}
const BlogListBody: React.VFC<Props> = ({ posts }) => {
  return (
    <Container as={m.div} variants={CONTAINER_VARIANTS} initial="initial" animate="present">
      <NoScreen as="h1">블로그 포스트 목록</NoScreen>
      {/* <Anchor href="/rss.xml">구독하기 (RSS)</Anchor> */}
      {posts.map((post) => (
        <BlogPostEntry key={post.slug} post={post} />
      ))}
    </Container>
  )
}

export default BlogListBody
