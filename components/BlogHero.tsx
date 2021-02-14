import React from 'react'

import { PostMetadata } from 'utils/posts'
import { styled } from 'utils/styler'

import { Container } from './basics'

const HeroContainer = styled('header', {
  background: '$base10',
  color: '$base100',
  marginBottom: 36,
  paddingTop: 210,
  paddingBottom: 160,
})

const Title = styled('h1', {
  color: '$base70',
  fontSize: 32,
  marginTop: 0,
  marginBottom: 0,
})

const Excerpt = styled('p', {
  fontFamily: 'sans-serif',
  marginTop: 16,
  marginBottom: 0,
})

const Created = styled('time', {
  fontFamily: 'sans-serif',
  fontSize: 12,
})

type Props = {
  meta: PostMetadata
}

const BlogHero: React.VFC<Props> = ({ meta }) => {
  const { created, excerpt, title } = meta

  return (
    <HeroContainer>
      <Container>
        <Title>{title}</Title>
        <Excerpt>{excerpt}</Excerpt>
        <Created>{created}</Created>
      </Container>
    </HeroContainer>
  )
}

export default BlogHero
