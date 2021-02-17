import React from 'react'

import { styled } from 'utils/styler'

import { HEADER_HEIGHT } from './BaseHeader'
import BlogPostEntry, { PostDatum } from './BlogPostEntry'
import { Anchor, Container as ContainerBase } from './basics'

const Container = styled(ContainerBase, {
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  background: 'url(/images/brand-d.svg) bottom right no-repeat',
  backgroundAttachment: 'scroll',
  backgroundSize: '500px',
  when: {
    narrow: {
      backgroundPositionX: '24px',
      backgroundSize: '360px',
    },
  },
})

const LatestPost = styled('div', {
  marginTop: 48,
})

const Heading = styled('h1', {
  fontSize: 24,
  marginBottom: 16,
})

type Props = {
  latestPost: PostDatum
}

const IndexBody: React.VFC<Props> = ({ latestPost }) => {
  return (
    <Container>
      <p aria-hidden={true}>⬆️ Open this menu</p>
      <LatestPost>
        <Heading>최신 글</Heading>
        <BlogPostEntry post={latestPost} />
        <Anchor href="/posts">더 보기</Anchor>
      </LatestPost>
    </Container>
  )
}

export default IndexBody
