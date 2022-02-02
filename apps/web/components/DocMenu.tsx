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
      <BaseMenu css={{ marginTop: 48 }} aria-label="문서 링크">
        <BaseMenuItem href="/docs/Web/HTML">HTML</BaseMenuItem>
        <BaseMenuItem href="/docs/Web/CSS">CSS</BaseMenuItem>
        <BaseMenuItem disabled={true} href="/docs/Web/JavaScript" title="공사 중">
          JavaScript
        </BaseMenuItem>
      </BaseMenu>
      <BaseMenu css={{ marginTop: 72 }} aria-label="다른 곳으로 이동">
        <BaseIntraNavItem href="/">Main Site</BaseIntraNavItem>
        <BaseIntraNavItem href="/post">Blog</BaseIntraNavItem>
      </BaseMenu>
    </Container>
  )
}

export default DocMenu
