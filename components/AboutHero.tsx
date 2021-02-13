import React from 'react'

import { styled } from 'utils/styler'

import { Container } from './basics'

const HeroContainer = styled('header', {
  background: '$base10',
  color: '$base100',
  marginBottom: 40,
  paddingTop: 132,
  paddingBottom: 88,
})

const Title = styled('h1', {
  color: '$base70',
  fontSize: 32,
  fontWeight: 700,
  marginTop: 0,
  marginBottom: 0,
})

const SubContainer = styled('div', {
  color: '$base100',
  display: 'flex',
  alignItems: 'center',
  marginTop: 16,
})

const Job = styled('nav', {
  display: 'flex',
  fontFamily: "'Nanum Gothic', sans-serif",
  marginTop: 0,
  marginBottom: 0,
  userSelect: 'none',
})

const AboutHero: React.VFC = () => {
  return (
    <HeroContainer>
      <Container>
        <Title>alattalatta</Title>
        <SubContainer>
          <Job>Web Front-end Developer</Job>
        </SubContainer>
      </Container>
    </HeroContainer>
  )
}

export default AboutHero
