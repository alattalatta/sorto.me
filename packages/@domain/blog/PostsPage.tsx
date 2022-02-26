import type { Page } from '@lib/ui'
import { Layout } from '@lib/ui'
import { styled } from '@lib/ui'
import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'

import { Post } from './Post'
import type { PostMetadata } from './types'

type Props = {
  posts: readonly PostMetadata[]
}

const Root = styled(m.main, {
  maxWidth: `${768 / 16}rem`,
  margin: 'auto',
  padding: '1rem',
})

const rootVariants: Variants = {
  show: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.125,
    },
  },
}

const PostWrap = styled(m.a, {
  color: 'inherit',
  display: 'block',
  textDecoration: 'none',
  '& + &': {
    marginTop: '2rem',
  },
})

const postWrapVariants: Variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

const PostFillHeight = styled(Post, {
  height: '100%',
})

const PostsPage: Page<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title key="title">blog - sorto.me</title>
        <meta key="og:title" content="sorto.me - blog" property="og:title" />
      </Head>
      <Root animate="show" initial="hidden" variants={rootVariants}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
            <PostWrap variants={postWrapVariants}>
              <PostFillHeight
                image={post.image}
                title={post.title}
                // [todo] parse as Date
                written={new Date(post.created)}
              />
            </PostWrap>
          </Link>
        ))}
      </Root>
    </>
  )
}
PostsPage.Layout = Layout

export type { Props }
export { PostsPage }
