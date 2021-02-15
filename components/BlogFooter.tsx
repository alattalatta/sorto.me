import React from 'react'

import { GITHUB_MAIN_URL } from 'utils/external'
import { PostMetadata } from 'utils/posts'

import BaseFooter from './BaseFooter'
import { Anchor } from './basics'

type Props = {
  meta: PostMetadata
}
const BlogFooter: React.VFC<Props> = ({ meta }) => {
  const { created, slug } = meta

  return (
    <BaseFooter sourceHref={`${GITHUB_MAIN_URL}/posts/${created}+${slug}.mdx`} updated={meta.updated}>
      <Anchor href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</Anchor> 아래에서 자유롭게 이용할 수
      있습니다.
    </BaseFooter>
  )
}

export default BlogFooter
