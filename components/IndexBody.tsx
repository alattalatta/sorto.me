import Link from 'next/link'
import React from 'react'

import { PostMetadata } from 'utils/posts'
import { styled } from 'utils/styler'

import PageHeaderOffset from './PageHeaderOffset'
import { Anchor, Container, NoScreen } from './basics'

export type PostDatum = {
  meta: PostMetadata
  slug: string
}

const Item = styled('article', {
  '& + &': {
    marginTop: '2em',
  },
})

const Post = styled(Anchor, {
  display: 'inline-flex',
  flexDirection: 'column',
  textDecoration: 'none',
})

const Title = styled('h2', {
  fontSize: '1.25rem',
  fontWeight: 700,
})

type Props = {
  posts: readonly PostDatum[]
}

const IndexBody: React.VFC<Props> = ({ posts }) => {
  return (
    <PageHeaderOffset as="main">
      <NoScreen as="h1">블로그 포스트 목록</NoScreen>
      <Container>
        {posts.map((post) => (
          <Item key={post.slug}>
            <Link href={`/post/${post.slug}`}>
              <Post href={`/post/${post.slug}`}>
                <Title>{post.meta.title}</Title>
                <time dateTime={post.meta.created}>{post.meta.created}</time>
              </Post>
            </Link>
          </Item>
        ))}
      </Container>
    </PageHeaderOffset>
  )
}

export default IndexBody
