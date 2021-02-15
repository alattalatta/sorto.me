import React from 'react'

import { styled } from 'utils/styler'

import { Anchor, Container } from './basics'

const Heading = styled('h1', {
  marginTop: 48,
})

const IndexBody: React.VFC = () => {
  return (
    <Container>
      <p>⬆️ Open the menu, or</p>
      <ul role="navigation">
        <li>
          <Anchor href="/posts">Blog</Anchor>
        </li>
        <li>
          <Anchor href="/about">About</Anchor>
        </li>
        <li>
          <Anchor href="/docs/Web">Web docs</Anchor>
        </li>
      </ul>
      <Heading>Under construction</Heading>
    </Container>
  )
}

export default IndexBody
