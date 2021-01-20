import Link from 'next/link'
import React from 'react'

import { PostMetadata } from 'utils/post'
import { styled } from 'utils/styler'

import { Container } from './Container'

type Props = {
  posts: readonly PostDatum[]
}

export type PostDatum = {
  meta: PostMetadata
  slug: string
}

const List = styled('ul', {
  listStyle: 'none',
  marginTop: '2rem',
  paddingLeft: 0,
})

const Post = styled('a', {
  '&:active': {
    backgroundColor: '#0ff',
    color: '#fff',
  },
  '&:hover': {
    color: '#f00',
  },
  color: '#0b0d0e',
  display: 'inline-flex',
  flexDirection: 'column',
  textDecoration: 'none',
})

const Title = styled('span', {
  fontSize: '1.25rem',
  fontWeight: 700,
})

const IndexBody: React.VFC<Props> = ({ posts }) => {
  return (
    <Container>
      <List>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/post/${post.slug}`}>
              <Post href={`/post/${post.slug}`}>
                <Title>{post.meta.title}</Title>
                <time dateTime={post.meta.created}>{post.meta.created}</time>
              </Post>
            </Link>
          </li>
        ))}
      </List>
    </Container>
  )
}

export default IndexBody
