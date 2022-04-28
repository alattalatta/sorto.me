import { PostsPage } from '@domain/blog'
import type { PostsPageProps } from '@domain/blog'
import type { GetStaticProps } from 'next'

import postIndex from '../../out/posts/index.json'

export default PostsPage

export const getStaticProps: GetStaticProps<PostsPageProps> = () => {
  return {
    props: {
      posts: postIndex,
    },
  }
}
