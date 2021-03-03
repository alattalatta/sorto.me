import React from 'react'

import { styled } from 'utils/styler'

import BaseMenu, { BaseMenuItem } from './BaseMenu'
import SearchField from './SearchField'
import { Container } from './basics'

const BaseIntraNavItem = styled(BaseMenuItem, {
  '&[class]::after': {
    content: '">"',
    display: 'inline-block',
    marginLeft: 24,
  },
})

const BlogMenu: React.VFC = () => {
  return (
    <Container>
      <SearchField placeholder="블로그 검색..." targetUrl="/posts/search" />
      <BaseMenu css={{ marginTop: 48 }} aria-label="블로그 링크">
        <BaseMenuItem href="/posts">Blog</BaseMenuItem>
        <BaseMenuItem href="/about">About</BaseMenuItem>
      </BaseMenu>
      <BaseMenu css={{ marginTop: 72 }} aria-label="다른 곳으로 이동">
        <BaseIntraNavItem href="/docs">Docs</BaseIntraNavItem>
      </BaseMenu>
    </Container>
  )
}

export default BlogMenu
