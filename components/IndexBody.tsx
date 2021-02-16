import React from 'react'

import { Container } from './basics'

const IndexBody: React.VFC = () => {
  return (
    <Container>
      <p aria-hidden={true}>⬆️ Open this menu</p>
      <img src="/images/brand-d.svg" alt="Sorto." style={{ marginTop: '64px' }} />
    </Container>
  )
}

export default IndexBody
