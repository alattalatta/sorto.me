import React from 'react'

import PageHeaderOffset from './PageHeaderOffset'
import { Container, Anchor } from './basics'

const IndexBody: React.VFC = () => {
  return (
    <PageHeaderOffset as="main">
      <Container>
        <Anchor href="/about">About me</Anchor>
      </Container>
    </PageHeaderOffset>
  )
}

export default IndexBody
