import type { Post } from '@contents/posts'
import postsIndex from '@contents/posts/data/index.json'
import { PostPage } from '@domain/blog'
import type { PostPageProps } from '@domain/blog'
import type { GetStaticPaths, GetStaticProps } from 'next'

type Params = { slug: string }

export default PostPage

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async ({ params }) => {
  if (!params?.slug) {
    throw new Error('Slug must exist')
  }

  const { content, meta } = await importPostData(params.slug)

  return {
    props: {
      compiledSource: content,
      meta,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  return {
    fallback: false,
    paths: postsIndex.map((post) => ({ params: { slug: post.slug } })),
  }
}

function importPostData(slug: string): Promise<Post> {
  return import(`@contents/posts/data/${slug}.json`) as Promise<Post>
}
