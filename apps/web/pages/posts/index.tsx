import postIndex from '@contents/posts/data/index.json'
import { PostsPage } from '@domain/blog'
import type { PostsPageProps } from '@domain/blog'
import type { GetStaticProps } from 'next'

export default PostsPage

export const getStaticProps: GetStaticProps<PostsPageProps> = () => {
  return {
    props: {
      posts: postIndex,
    },
  }
}
