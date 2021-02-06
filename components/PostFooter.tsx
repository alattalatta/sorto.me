import React from 'react'

import { GITHUB_MAIN_URL } from 'utils/external'
import { PostMetadata } from 'utils/posts'

import PageFooter, { FooterColumn } from './PageFooter'
import { AnchorExternal } from './basics'

type Props = {
  meta: PostMetadata
}

const PostFooter: React.VFC<Props> = ({ meta }) => {
  const { created, slug } = meta

  return (
    <PageFooter>
      <FooterColumn>
        <AnchorExternal href={`${GITHUB_MAIN_URL}/posts/${created}+${slug}.mdx`}>GitHub에서 보기</AnchorExternal>
      </FooterColumn>
      <FooterColumn as="small">
        <AnchorExternal href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</AnchorExternal> 아래에서
        자유롭게 이용할 수 있습니다.
      </FooterColumn>
    </PageFooter>
  )
}

export default PostFooter
