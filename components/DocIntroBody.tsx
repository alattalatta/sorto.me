import React from 'react'

import { styled } from 'utils/styler'

import { Anchor, Container as ContainerBase } from './basics'

const Container = styled(ContainerBase, {
  lineHeight: 1.75,
  '& > * + *': {
    marginTop: 24,
  },
})

const H1 = styled('h1', {
  fontFamily: '$sans',
  fontSize: 36,
})

const H2 = styled('h2', {
  fontFamily: '$sans',
  fontSize: 24,
})

const DocIntroBody: React.VFC = () => {
  return (
    <article>
      <Container>
        <H1>Docs</H1>
        <H2>페이지 목록</H2>
        <ul>
          <li>
            <Anchor href="/docs/search">검색하기</Anchor>
          </li>
          <li>
            <Anchor href="/docs/Web/HTML/Element">HTML 요소 참고서</Anchor>
          </li>
          <li>
            <Anchor href="/docs/Web/HTML/Global_attributes">HTML 전역 특성 참고서</Anchor>
          </li>
        </ul>
      </Container>
    </article>
  )
}

export default DocIntroBody
