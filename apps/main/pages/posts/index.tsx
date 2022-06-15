import { PostsPage } from '@domain/blog'
import type { PostsPageProps } from '@domain/blog'
import postIndex from '@domain/blog/out/index.json'
import type { GetStaticProps } from 'next'

export default PostsPage

export const getStaticProps: GetStaticProps<PostsPageProps> = () => {
  return {
    props: {
      posts: postIndex,
    },
  }
}
