import Link from 'next/link'
import React from 'react'

import { PostMetadata } from 'utils/posts'
import { styled } from 'utils/styler'

import { Anchor, Container } from './basics'

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

const Item = styled('li', {
  '& + &': {
    marginTop: '2em',
  },
})

const Post = styled(Anchor, {
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
          <Item key={post.slug}>
            <Link href={`/post/${post.slug}`}>
              <Post href={`/post/${post.slug}`}>
                <Title>{post.meta.title}</Title>
                <time dateTime={post.meta.created}>{post.meta.created}</time>
              </Post>
            </Link>
          </Item>
        ))}
      </List>
    </Container>
  )
}

export default IndexBody
