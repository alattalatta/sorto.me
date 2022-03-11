import type { Page } from '@lib/ui'
import { Layout } from '@lib/ui'
import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'

import { Post } from './Post'
import * as styles from './PostsPage.css'
import type { PostMetadata } from './types'

type Props = {
  posts: readonly PostMetadata[]
}

const rootVariants: Variants = {
  show: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.125,
    },
  },
}

const postWrapVariants: Variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

const PostsPage: Page<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title key="title">blog - sorto.me</title>
        <meta key="og:title" content="sorto.me - blog" property="og:title" />
      </Head>
      <m.main animate="show" className={styles.root} initial="hidden" variants={rootVariants}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
            <m.a className={styles.postWrap} variants={postWrapVariants}>
              <Post
                className={styles.fillHeight}
                image={post.image}
                title={post.title}
                // [todo] parse as Date
                written={new Date(post.created)}
              />
            </m.a>
          </Link>
        ))}
      </m.main>
    </>
  )
}
PostsPage.Layout = Layout

export type { Props }
export { PostsPage }
