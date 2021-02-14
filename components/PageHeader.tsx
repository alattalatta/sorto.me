import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { styled } from 'utils/styler'

import { Anchor, CONTAINER_CONTENT_BOX_WIDTH } from './basics'

export const HEADER_HEIGHT = 80
const BRAND_HEIGHT = 52

const Header = styled(motion.header, {
  maxWidth: CONTAINER_CONTENT_BOX_WIDTH,
  height: HEADER_HEIGHT,
  background: '$base20',
  borderRadius: '$cornerRadius',
  color: '$base100',
  display: 'flex',
  alignItems: 'center',
  marginRight: 'auto',
  marginLeft: 'auto',
  paddingRight: 24,
  paddingLeft: 24,
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  zIndex: 9,
})

const Brand = styled(motion.a, {
  width: 148,
  height: BRAND_HEIGHT,
  backgroundColor: '$accentY',
  borderRadius: '$cornerRadius',
  boxShadow: '0px 2px 12px $accentY',
  color: '$base20',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: 20,
  padding: 16,
  textDecoration: 'none',
  '&:active': {
    color: '$base100',
    backgroundColor: '$accentR',
    boxShadow: '0px 2px 12px $accentR',
  },
  '&:hover': {
    backgroundColor: '$accentB',
    boxShadow: '0px 2px 12px $accentB',
  },
})

const PageLinkGroup = styled('nav', {
  display: 'flex',
})

const PageLink = styled(Anchor, {
  color: '$base100',
  fontSize: 18,
  marginLeft: 48,
  textDecoration: 'none',
})

const PageHeader: React.VFC = () => {
  const [scrolledOverThreshold, setScrolledOverThreshold] = useState(false)

  useEffect(() => {
    const handler = () => {
      setScrolledOverThreshold(window.pageYOffset > HEADER_HEIGHT * 2)
    }

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [])

  const borderRadius = scrolledOverThreshold ? '0px' : '8px'
  const headerInitial = {
    height: HEADER_HEIGHT,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    y: 16,
  }
  const headerAnimationTarget = {
    height: scrolledOverThreshold ? 64 : HEADER_HEIGHT,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
    y: scrolledOverThreshold ? 0 : 16,
  }

  return (
    <Header animate={headerAnimationTarget} initial={headerInitial}>
      <Link href="/">
        <Brand href="/" title="홈으로 이동" style={{ height: scrolledOverThreshold ? 40 : BRAND_HEIGHT }}>
          Sorto.me
        </Brand>
      </Link>
      <PageLinkGroup>
        <Link href="/posts">
          <PageLink href="/posts">Blog</PageLink>
        </Link>
        <Link href="/docs/Web">
          <PageLink href="/docs/Web">Docs</PageLink>
        </Link>
      </PageLinkGroup>
    </Header>
  )
}
export default PageHeader
