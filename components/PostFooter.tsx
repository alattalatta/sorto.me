import React from 'react'

import { GITHUB_MAIN_URL } from 'utils/external'
import { PostMetadata } from 'utils/posts'

import PageFooter, { FooterColumn } from './PageFooter'
import { Anchor } from './basics'

type Props = {
  meta: PostMetadata
}

const PostFooter: React.VFC<Props> = ({ meta }) => {
  const { created, slug } = meta

  return (
    <PageFooter>
      <FooterColumn>
        <Anchor href={`${GITHUB_MAIN_URL}/posts/${created}+${slug}.mdx`}>GitHub에서 보기</Anchor>
      </FooterColumn>
      <FooterColumn as="small">
        <Anchor href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</Anchor> 아래에서 자유롭게 이용할 수
        있습니다.
      </FooterColumn>
    </PageFooter>
  )
}

export default PostFooter
