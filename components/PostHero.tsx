import React from 'react'

import { styled } from 'utils/styler'

import { Container, CONTAINER_PADDING } from './Container'

const HeroContainer = styled('div', {
  alignItems: 'center',
  background: 'black',
  color: 'white',
  display: 'flex',
  fontFamily: 'sans-serif',
  justifyContent: 'center',
  marginBottom: 40,
  marginLeft: -CONTAINER_PADDING,
  marginRight: -CONTAINER_PADDING,
  padding: '88px 0',
})

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: 400,
  margin: 0,
})

const Excerpt = styled('p', {
  marginBottom: 0,
  marginTop: '1em',
})

const Created = styled('time', {
  fontSize: '0.8rem',
  opacity: 0.8,
})

const PostHero: React.VFC<{ created?: string; excerpt?: string; title: string }> = ({ created, excerpt, title }) => {
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

export default PostHero
