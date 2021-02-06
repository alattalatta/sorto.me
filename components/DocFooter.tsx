import React from 'react'

import { GITHUB_MAIN_URL } from 'utils/external'
import { styled } from 'utils/styler'

import PageFooter, { FooterColumn } from './PageFooter'
import { AnchorExternal } from './basics'

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
  slugs: string[]
  updated: string
}

const PostFooter: React.VFC<Props> = ({ slugs, updated }) => {
  const path = slugs.join('/')
  const [y, m, d] = updated.split('-').map(Number)

  return (
    <PageFooter>
      <FooterColumn>
        <Block>마지막 업데이트</Block>
        <Block as="time" dateTime={updated}>
          {y}년 {m}월 {d}일
        </Block>
        <SeparatedBlock>
          <AnchorExternal href={`${GITHUB_MAIN_URL}/docs/${path}.mdx`}>GitHub에서 보기</AnchorExternal>
        </SeparatedBlock>
      </FooterColumn>
      <FooterColumn as="small">
        <Block>
          본 문서는 <AnchorExternal href="https://developer.mozilla.org/">MDN</AnchorExternal> (en-US 및 ko) 문서에
          기반을 두고 있습니다.
        </Block>
        <Block>
          <AnchorExternal href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</AnchorExternal> 아래에서
          자유롭게 이용할 수 있습니다.
        </Block>
        <SeparatedBlock css={{ fontSize: 10 }}>
          <Block>
            "title" from MDN contributors is licensed under{' '}
            <AnchorExternal href="https://creativecommons.org/licenses/by-sa/2.5/">CC BY-SA 2.5</AnchorExternal>.
          </Block>
          <Block>
            <AnchorExternal href={`https://developer.mozilla.org/en-US/docs/${path}/contributors.txt`}>
              List of the contributors
            </AnchorExternal>
            <AnchorExternal
              css={{ marginLeft: 6 }}
              href={`https://developer.mozilla.org/ko/docs/${path}/contributors.txt`}
            >
              한국어 문서 기여자
            </AnchorExternal>
          </Block>
        </SeparatedBlock>
      </FooterColumn>
    </PageFooter>
  )
}

export default PostFooter
