import React from 'react'

import { GITHUB_MAIN_URL } from 'utils/external'
import { styled } from 'utils/styler'

import { AnchorExternal, Container } from './basics'

type Props = {
  slug: string
  updated: string
}

const FooterContainer = styled('footer', {
  background: '#e8ebed',
  marginTop: 40,
  paddingTop: 40,
  paddingBottom: 40,
})

const DocFooter: React.VFC<Props> = ({ slug, updated }) => {
  const mdnHref = `https://developer.mozilla.org/ko/docs/${slug}`
  return (
    <FooterContainer>
      <Container>
        <p>
          최종 업데이트: {updated}{' '}
          <AnchorExternal href={`${GITHUB_MAIN_URL}/docs/${slug}.mdx`}>(GitHub에서 보기)</AnchorExternal>
        </p>
        <p>
          본 문서는 <AnchorExternal href="https://developer.mozilla.org/ko/">한국어 MDN</AnchorExternal> 문서에 기반을
          두고 있습니다. <AnchorExternal href={mdnHref}>(원본 문서)</AnchorExternal>{' '}
          <AnchorExternal href={`${mdnHref}/contributors.txt`}>(기여자)</AnchorExternal>
          <br />
          <small>
            <AnchorExternal href="https://creativecommons.org/licenses/by-sa/2.5/">
              Licensed under CC-BY-SA 2.5
            </AnchorExternal>
            .
          </small>
        </p>
      </Container>
    </FooterContainer>
  )
}

export default DocFooter
