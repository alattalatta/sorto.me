import React from 'react'

import { BASE10, BASE100, styled } from 'utils/styler'

import { Container } from './basics'

const TitleContainer = styled('header', {
  background: BASE10,
  color: BASE100,
  marginBottom: 40,
  paddingTop: '24px',
  paddingBottom: '24px',
})

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: 400,
  margin: 0,
})

const DocHero: React.VFC<{ children: string }> = ({ children }) => {
  return (
    <TitleContainer>
      <Container>
        <Title>{children}</Title>
      </Container>
    </TitleContainer>
  )
}

export default DocHero
