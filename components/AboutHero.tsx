import React from 'react'

import { BASE10, BASE100, BASE70, styled } from 'utils/styler'

import { Container } from './basics'

const HeroContainer = styled('header', {
  background: BASE10,
  color: BASE100,
  marginBottom: 40,
  paddingTop: 132,
  paddingBottom: 88,
})

const Title = styled('h1', {
  color: BASE70,
  fontSize: 32,
  fontWeight: 700,
  marginTop: 0,
  marginBottom: 0,
})

const SubContainer = styled('div', {
  color: BASE100,
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
