import React from 'react'

import { DocMetadata } from 'utils/docs'
import { GITHUB_MAIN_URL } from 'utils/external'
import { styled } from 'utils/styler'

import BaseFooter from './BaseFooter'
import { Anchor } from './basics'

const Paragraph = styled('p', {
  '&:not(:first-child)': {
    marginTop: 16,
  },
})

type Props = {
  meta: DocMetadata
  slugs: string[]
}
const PostFooter: React.VFC<Props> = ({ meta, slugs }) => {
  const path = slugs.join('/')
  const attributionTitle = meta.originalTitle || meta.title

  return (
    <BaseFooter sourceHref={`${GITHUB_MAIN_URL}/docs/${path}.mdx`} updated={meta.updated}>
      <Paragraph>
        본 문서는 <Anchor href="https://developer.mozilla.org/">MDN</Anchor> (en-US 및 ko) 문서에 기반을 두고 있습니다.
        <br />
        <Anchor href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</Anchor> 아래에서 자유롭게 이용할 수
        있습니다.
      </Paragraph>
      <Paragraph>
        <small>
          "{attributionTitle}" from MDN contributors is licensed under{' '}
          <Anchor href="https://creativecommons.org/licenses/by-sa/2.5/">CC BY-SA 2.5</Anchor>.<br />
          <Anchor href={`https://developer.mozilla.org/en-US/docs/${path}/contributors.txt`}>
            List of the contributors
          </Anchor>{' '}
          <Anchor href={`https://developer.mozilla.org/ko/docs/${path}/contributors.txt`}>한국어 문서 기여자</Anchor>
        </small>
      </Paragraph>
    </BaseFooter>
  )
}

export default PostFooter
