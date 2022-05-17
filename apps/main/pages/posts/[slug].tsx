import { PostPage } from '@domain/blog'
import type { PostPageProps, Post, PostMetadata } from '@domain/blog'
import type { Page } from '@lib/ui'
import type { GetStaticPaths, GetStaticProps } from 'next'
import useSWR from 'swr'

import postsIndex from '../../out/posts/index.json'

import '../../styles/document-body.css'

type Params = { slug: string }

const PostPageWrap: Page<PostPageProps> = ({ compiledSource, meta, ...props }) => {
  const { data } = useSWR<{ compiledSource: string; meta: PostMetadata }>(
    `/api/post?slug=${meta.slug}`,
    (key: string) => fetch(key).then((res) => res.json()),
    {
      fallbackData: { compiledSource, meta },
      refreshInterval: 2000,
      isPaused: () => process.env.NODE_ENV === 'production',
    },
  )

  return <PostPage {...props} compiledSource={data?.compiledSource || compiledSource} meta={data?.meta || meta} />
}
PostPageWrap.Layout = PostPage.Layout

export default PostPageWrap

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
  return import(`../../out/posts/${slug}.json`) as Promise<Post>
}