import type { Page } from '@lib/ui'
import { Layout } from '@lib/ui'
import Head from 'next/head'
import Link from 'next/link'

import { Post } from './Post'
import * as styles from './PostsPage.css'
import type { PostMetadata } from './types'

type Props = {
  posts: readonly PostMetadata[]
}

const PostsPage: Page<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title key="title">blog - sorto.me</title>
        <meta key="og:title" content="sorto.me - blog" property="og:title" />
      </Head>
      <main className={styles.root}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
            <a className={styles.postWrap}>
              <Post
                className={styles.fillHeight}
                image={post.image}
                title={post.title}
                // [todo] parse as Date
                written={new Date(post.created)}
              />
            </a>
          </Link>
        ))}
      </main>
    </>
  )
}
PostsPage.Layout = Layout

export type { Props }
export { PostsPage }
