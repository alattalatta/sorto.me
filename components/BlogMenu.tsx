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
      <BaseMenu css={{ marginTop: 48 }} role="group" aria-label="블로그 링크">
        <li role="menuitem">
          <BaseMenuItem href="/posts">Blog</BaseMenuItem>
        </li>
        <li role="menuitem">
          <BaseMenuItem href="/about">About</BaseMenuItem>
        </li>
      </BaseMenu>
      <BaseMenu css={{ marginTop: 72 }} role="group" aria-label="다른 곳으로 이동">
        <li role="menuitem">
          <BaseIntraNavItem href="/docs">Docs</BaseIntraNavItem>
        </li>
      </BaseMenu>
    </Container>
  )
}

export default BlogMenu
