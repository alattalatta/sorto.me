import React from 'react'

import { styled } from 'utils/styler'

import { Container } from './Container'
import { Anchor } from './basics'

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
          <Anchor
            href={`https://github.com/alattalatta/sorto.me/blob/main/docs/${slug}.mdx`}
            target="_blank"
            rel="noreferrer noopener"
          >
            (GitHub에서 보기)
          </Anchor>
        </p>
        <p>
          본 문서는{' '}
          <Anchor href="https://developer.mozilla.org/ko/" target="_blank" rel="noreferrer noopener">
            한국어 MDN
          </Anchor>{' '}
          문서에 기반을 두고 있습니다.{' '}
          <Anchor href={mdnHref} target="_blank" rel="noreferrer noopener">
            (원본 문서)
          </Anchor>{' '}
          <Anchor href={`${mdnHref}/contributors.txt`} target="_blank" rel="noreferrer noopener">
            (기여자)
          </Anchor>
          <br />
          <small>
            <Anchor href="https://creativecommons.org/licenses/by-sa/2.5/" target="_blank" rel="noreferrer noopener">
              Licensed under CC-BY-SA 2.5
            </Anchor>
            .
          </small>
        </p>
      </Container>
    </FooterContainer>
  )
}

export default DocFooter
