import React from 'react'

import { styled } from 'utils/styler'

import BaseMenu, { BaseMenuItem } from './BaseMenu'
import SearchField from './SearchField'
import { Container } from './basics'

const BaseIntraNavItem = styled(BaseMenuItem, {
  '&[class]::before': {
    content: '"<"',
    display: 'inline-block',
    marginRight: 24,
  },
})

const DocMenu: React.VFC = () => {
  return (
    <Container>
      <SearchField placeholder="Docs 검색..." targetUrl="/docs/search" />
      <BaseMenu css={{ marginTop: 48 }} role="group" aria-label="문서 링크">
        <li role="menuitem">
          <BaseMenuItem href="/docs/Web/HTML">HTML</BaseMenuItem>
        </li>
        <li role="menuitem">
          <BaseMenuItem disabled={true} href="/docs/Web/CSS" title="공사 중">
            CSS
          </BaseMenuItem>
        </li>
        <li role="menuitem">
          <BaseMenuItem disabled={true} href="/docs/Web/JavaScript" title="공사 중">
            JavaScript
          </BaseMenuItem>
        </li>
      </BaseMenu>
      <BaseMenu css={{ marginTop: 72 }} role="group" aria-label="다른 곳으로 이동">
        <li role="menuitem">
          <BaseIntraNavItem href="/">Main Site</BaseIntraNavItem>
        </li>
        <li role="menuitem">
          <BaseIntraNavItem href="/post">Blog</BaseIntraNavItem>
        </li>
      </BaseMenu>
    </Container>
  )
}

export default DocMenu
