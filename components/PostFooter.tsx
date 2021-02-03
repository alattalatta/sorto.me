import React from 'react'

import { styled } from 'utils/styler'

import { Container } from './Container'

const FooterContainer = styled('footer', {
  background: '#000',
  color: '#fff',
  marginTop: '120px',
  paddingTop: '50px',
  paddingBottom: '50px',
})

const PostFooter: React.VFC = () => {
  return (
    <FooterContainer>
      <Container>{/* [todo] */}</Container>
    </FooterContainer>
  )
}

export default PostFooter
