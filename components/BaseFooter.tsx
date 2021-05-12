import React from 'react'

import { styled } from 'utils/styler'

import { Anchor, Break, Container as BaseContainer } from './basics'

const FooterContainer = styled('footer', {
  background: '$base10',
  color: '#A4ACB3',
  lineHeight: 1.45,
  marginTop: 72,
  paddingTop: 84,
  paddingBottom: 84,
  '@tiny': {
    paddingTop: 60,
    paddingBottom: 60,
  },
})

const Container = styled(BaseContainer, {
  display: 'flex',
  '& a': {
    color: '$linkblueLight',
    display: 'inline-block',
  },
  '& a:hover': {
    color: '$linkblueLightHover',
  },
  '@narrow': {
    display: 'block',
  },
})

const FooterColumn = styled('div', {
  width: '50%',
  color: '#A4ACB3',
  fontSize: '1em',
  '@narrow': {
    width: '100%',
    '&:not(:first-child)': {
      marginTop: 36,
    },
  },
})

type Props = {
  sourceHref: string
  updated: string
}
const BaseFooter: React.FC<Props> = ({ children, sourceHref, updated }) => {
  const [y, m, d] = updated.split('-')

  return (
    <FooterContainer>
      <Container>
        <FooterColumn>
          <p>
            마지막 업데이트
            <Break />
            <time>
              {y}년 {m}월 {d}일
            </time>
            <Break />
            <Break />
            <Anchor href={sourceHref}>GitHub에서 보기</Anchor>
          </p>
        </FooterColumn>
        <FooterColumn>{children}</FooterColumn>
      </Container>
    </FooterContainer>
  )
}

export default BaseFooter
