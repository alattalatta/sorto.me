import React from 'react'

import { styled } from 'utils/styler'

import BlogPostEntry, { PostDatum } from './BlogPostEntry'
import { Anchor, Container } from './basics'

const Section = styled('section', {
  marginTop: 48,
})

const Heading = styled('h1', {
  fontFamily: '$sans',
  fontSize: 24,
  marginBottom: 8,
})

const ToBlogWrap = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 16,
  '@wide': {
    justifyContent: 'flex-start',
  },
})

const ToBlog = styled(Anchor, {
  background: '#fff',
  border: '1px solid currentColor',
  borderRadius: '$cornerRadius',
  color: '$base60',
  display: 'block',
  fontFamily: '$sans',
  padding: '16px 24px',
  textDecoration: 'none',
})

const ToAboutWrap = styled('div', {
  marginTop: 24,
})

const Eyecatch = styled('img', {
  width: 500,
  maxWidth: '100%',
  display: 'block',
  marginTop: 64,
  marginLeft: 'auto',
})

type Props = {
  latestPost: PostDatum
}

const IndexBody: React.VFC<Props> = ({ latestPost }) => {
  return (
    <Container>
      <p aria-hidden={true}>⬆️ Open this menu</p>
      <Section>
        <Heading>최신 글</Heading>
        <BlogPostEntry post={latestPost} />
        <ToBlogWrap>
          <ToBlog href="/posts">블로그 더 보기</ToBlog>
        </ToBlogWrap>
      </Section>
      <Section>
        <Heading>About me</Heading>
        <ToAboutWrap>
          <Anchor href="/about">Link to "About" page</Anchor>
        </ToAboutWrap>
      </Section>
      <Section as="footer">
        <Anchor href="https://github.com/alattalatta/sorto.me">GitHub: alattalatta/sorto.me</Anchor>
      </Section>
      <Eyecatch src="/images/brand-d.svg" alt="" />
    </Container>
  )
}

export default IndexBody
