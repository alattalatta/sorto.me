import React from 'react'

import { styled } from 'utils/styler'

import { Container } from './Container'

const TitleContainer = styled('header', {
  background: 'black',
  color: 'white',
  fontFamily: 'sans-serif',
  marginBottom: 40,
  paddingTop: '24px',
  paddingBottom: '24px',
})

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: 400,
  margin: 0,
})

const PostHero: React.VFC<{ children: string }> = ({ children }) => {
  return (
    <TitleContainer>
      <Container>
        <Title>{children}</Title>
      </Container>
    </TitleContainer>
  )
}

export default PostHero
