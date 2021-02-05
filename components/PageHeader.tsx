import { motion, useTransform, useViewportScroll } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

import { styled } from 'utils/styler'

import { Anchor, Container as BaseContainer } from './basics'

export const HEADER_HEIGHT = 80

const Header = styled(motion.nav, {
  background: '#fff',
  borderBottom: '1px solid #ddd',
  color: '#000',
  height: HEADER_HEIGHT,
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1,
})

const Container = styled(BaseContainer, {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
})

const Brand = styled(motion.a, {
  '&:active': {
    backgroundColor: '#0ff',
  },
  '&:hover': {
    backgroundColor: '#f00',
  },
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '1.25rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  padding: '0.25rem',
  textDecoration: 'none',
  transformOrigin: 'left center',
})

const PageLinkGroup = styled('nav', {
  display: 'flex',
  marginLeft: 24,
})

const PageLink = styled(Anchor, {
  color: '#000',
  display: 'block',
  fontSize: '1.1em',
  marginLeft: 24,
  textDecoration: 'none',
})

const PageHeader: React.VFC = () => {
  const { scrollY } = useViewportScroll()

  const scrollPoints = [0, HEADER_HEIGHT * 2]

  const headerScale = useTransform(scrollY, scrollPoints, ['5rem', '2.5rem'])
  const brandScale = useTransform(scrollY, scrollPoints, [1, 0.75])
  // const linkOpacity = useTransform(scrollY, scrollPoints, [1, 0])

  return (
    <Header style={{ height: headerScale }}>
      <Container>
        <Link href="/">
          <Brand style={{ scale: brandScale }} href="/" title="홈으로 이동">
            Sorto.me
          </Brand>
        </Link>
        <PageLinkGroup>
          <Link href="/post">
            <PageLink href="/post">Blog</PageLink>
          </Link>
          <Link href="/docs/Web">
            <PageLink href="/docs/Web">Docs</PageLink>
          </Link>
          <Link href="/about">
            <PageLink href="/about">About</PageLink>
          </Link>
        </PageLinkGroup>
      </Container>
    </Header>
  )
}
export default PageHeader
