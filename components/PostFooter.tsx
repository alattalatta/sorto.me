import React from 'react'

import { GITHUB_MAIN_URL } from 'utils/external'
import { PostMetadata } from 'utils/posts'
import { BASE10, BASE100, styled } from 'utils/styler'

import { AnchorExternal, Container as BaseContainer } from './basics'

const FooterContainer = styled('footer', {
  background: BASE10,
  color: BASE100,
  marginTop: 72,
  paddingTop: 84,
  paddingBottom: 84,
})

const Container = styled(BaseContainer, {
  display: 'flex',
  opacity: 0.67,
})

const Column = styled('div', {
  width: '50%',
  fontSize: '1em',
})

type Props = {
  meta: PostMetadata
}

const PostFooter: React.VFC<Props> = ({ meta }) => {
  const { created, slug } = meta

  return (
    <FooterContainer>
      <Container>
        <Column>
          <AnchorExternal href={`${GITHUB_MAIN_URL}/posts/${created}+${slug}.mdx`}>GitHub에서 보기</AnchorExternal>
        </Column>
        <Column as="small">
          <AnchorExternal href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</AnchorExternal> 아래에서
          자유롭게 이용할 수 있습니다.
        </Column>
      </Container>
    </FooterContainer>
  )
}

export default PostFooter
