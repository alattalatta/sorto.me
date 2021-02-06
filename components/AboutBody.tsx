import React from 'react'

import { styled } from 'utils/styler'

import PageHeaderOffset from './PageHeaderOffset'
import { Anchor, Container } from './basics'

const AlignLeft = styled('div', {
  textAlign: 'left',
})

const AboutBody: React.VFC = () => {
  return (
    <PageHeaderOffset as="article">
      <Container>
        <AlignLeft>
          <h1>alattalatta</h1>
          <p>
            Web front-end developer
            <br />
            <Anchor href="mailto:urty5656@gmail.com">urty5656@gmail.com</Anchor>
          </p>
          <ul>
            <li>
              <Anchor href="https://github.com/alattalatta">GitHub</Anchor>
            </li>
            <li>
              <Anchor href="https://www.linkedin.com/in/%EC%A2%85%EB%A5%A0-%EC%96%91-9a740b14b/">LinkedIn</Anchor>
            </li>
          </ul>
        </AlignLeft>
      </Container>
    </PageHeaderOffset>
  )
}

export default AboutBody
