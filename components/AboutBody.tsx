import React from 'react'

import { BASE40, styled } from 'utils/styler'

import AboutHero from './AboutHero'
import { Anchor, Container } from './basics'

const Heading = styled('h2', {
  color: BASE40,
  marginTop: 32,
  marginBottom: 24,
})

const AboutBody: React.VFC = () => {
  return (
    <article>
      <AboutHero />
      <Container>
        <Heading>Email</Heading>
        <p>
          <Anchor href="mailto:urty5656@gmail.com">urty5656@gmail.com</Anchor>
        </p>
        <Heading>Other links</Heading>
        <ul>
          <li>
            <Anchor href="https://github.com/alattalatta">GitHub</Anchor>
          </li>
          <li>
            <Anchor href="https://www.linkedin.com/in/%EC%A2%85%EB%A5%A0-%EC%96%91-9a740b14b/">LinkedIn</Anchor>
          </li>
        </ul>
      </Container>
    </article>
  )
}

export default AboutBody
