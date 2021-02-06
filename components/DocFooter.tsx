import React from 'react'

import { DocMetadata } from 'utils/docs'
import { GITHUB_MAIN_URL } from 'utils/external'
import { styled } from 'utils/styler'

import PageFooter, { FooterColumn } from './PageFooter'
import { Anchor } from './basics'

const Block = styled('div', {
  display: 'block',

  '& + &': {
    marginTop: 6,
  },
})

const SeparatedBlock = styled('div', {
  marginTop: 18,
})

type Props = {
  meta: DocMetadata
  slugs: string[]
}

const PostFooter: React.VFC<Props> = ({ meta, slugs }) => {
  const path = slugs.join('/')
  const [y, m, d] = meta.updated.split('-').map(Number)

  const attributionTitle = meta.originalTitle || meta.title

  return (
    <PageFooter>
      <FooterColumn>
        <Block>마지막 업데이트</Block>
        <Block as="time" dateTime={meta.updated}>
          {y}년 {m}월 {d}일
        </Block>
        <SeparatedBlock>
          <Anchor href={`${GITHUB_MAIN_URL}/docs/${path}.mdx`}>GitHub에서 보기</Anchor>
        </SeparatedBlock>
      </FooterColumn>
      <FooterColumn as="small">
        <Block>
          본 문서는 <Anchor href="https://developer.mozilla.org/">MDN</Anchor> (en-US 및 ko) 문서에 기반을 두고
          있습니다.
        </Block>
        <Block>
          <Anchor href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</Anchor> 아래에서 자유롭게 이용할
          수 있습니다.
        </Block>
        <SeparatedBlock css={{ fontSize: 10 }}>
          <Block>
            "{attributionTitle}" from MDN contributors is licensed under{' '}
            <Anchor href="https://creativecommons.org/licenses/by-sa/2.5/">CC BY-SA 2.5</Anchor>.
          </Block>
          <Block>
            <Anchor href={`https://developer.mozilla.org/en-US/docs/${path}/contributors.txt`}>
              List of the contributors
            </Anchor>
            <Anchor css={{ marginLeft: 6 }} href={`https://developer.mozilla.org/ko/docs/${path}/contributors.txt`}>
              한국어 문서 기여자
            </Anchor>
          </Block>
        </SeparatedBlock>
      </FooterColumn>
    </PageFooter>
  )
}

export default PostFooter
