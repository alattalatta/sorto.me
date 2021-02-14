import React from 'react'

import { PostMetadata } from 'utils/posts'
import { styled } from 'utils/styler'

import { Anchor, Container as ContainerBase, NoScreen } from './basics'

export type PostDatum = {
  meta: PostMetadata
  slug: string
}

const Post = styled('article', {
  paddingTop: 24,
  paddingBottom: 24,
})

const Wrap = styled(Anchor, {
  color: 'inherit',
  display: 'flex',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
  when: {
    medium: {
      display: 'block',
    },
  },
})

const Block = styled('div', {
  '&:not(:first-child)': {
    marginLeft: 64,
  },
  when: {
    medium: {
      '&:not(:first-child)': {
        marginTop: 16,
        marginLeft: 0,
      },
    },
  },
})

const TextBlock = styled(Block, {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
})

const Image = styled('img', {
  width: 450,
  display: 'block',
  when: {
    narrow: {
      width: '100%',
    },
  },
})

const Title = styled('h2', {
  fontSize: 36,
  fontWeight: 700,
})

const Excerpt = styled('p', {
  fontFamily: '"Nanum Gothic", sans-serif',
  marginTop: 12,
})

const Time = styled('time', {
  display: 'block',
  marginTop: 16,
})

const BlogPost: React.VFC<{ post: PostDatum }> = ({ post }) => {
  return (
    <Post aria-labelledby={post.slug}>
      <Wrap href={`/posts/${post.slug}`}>
        <Block>
          <Image src={post.meta.image} alt="" width="450" />
        </Block>
        <TextBlock>
          <Title id={post.slug}>{post.meta.title}</Title>
          {post.meta.excerpt && <Excerpt>{post.meta.excerpt}</Excerpt>}
          <Time dateTime={post.meta.created}>{post.meta.created}</Time>
        </TextBlock>
      </Wrap>
    </Post>
  )
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
    <Container>
      <NoScreen as="h1">블로그 포스트 목록</NoScreen>
      {posts.map((post) => (
        <BlogPost key={post.slug} post={post} />
      ))}
    </Container>
  )
}

export default BlogListBody
