import React from 'react'

import { BASE10, BASE100, styled } from 'utils/styler'

import { Container as BaseContainer } from './basics'

const FooterContainer = styled('footer', {
  background: BASE10,
  color: BASE100,
  marginTop: 72,
  paddingTop: 84,
  paddingBottom: 84,
})

const Container = styled(BaseContainer, {
  display: 'flex',
})

export const FooterColumn = styled('div', {
  width: '50%',
  color: '#A4ACB3',
  fontSize: '1em',
})

const PageFooter: React.FC = ({ children }) => {
  return (
    <FooterContainer>
      <Container>{children}</Container>
    </FooterContainer>
  )
}

export default PageFooter
