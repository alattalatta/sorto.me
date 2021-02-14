import React from 'react'

import { styled } from 'utils/styler'

import BaseHeader, { HeaderNavMenuItem, HeaderNavMenu } from './BaseHeader'
import SearchField from './SearchField'
import { Anchor, Container } from './basics'

const Brand = styled(Anchor, {
  color: '$base100',
  fontSize: 32,
  fontWeight: 700,
  textDecoration: 'none',
  '&:hover': {
    color: '$base100',
  },
})

const HeaderIntraNavItem = styled(HeaderNavMenuItem, {
  '&::before': {
    content: '"<"',
    display: 'inline-block',
    marginRight: 24,
  },
})

const DocHeader: React.VFC = () => {
  return (
    <BaseHeader brightness="dark">
      {{
        brand: <Brand href="/docs/Web">Docs</Brand>,
        menu: (
          <Container>
            <SearchField placeholder="Docs 검색..." targetUrl="/docs/search" />
            <HeaderNavMenu css={{ marginTop: 48 }} role="group" aria-label="문서 링크">
              <li role="menuitem">
                <HeaderNavMenuItem href="/docs/Web/HTML">HTML</HeaderNavMenuItem>
              </li>
              <li role="menuitem">
                <HeaderNavMenuItem disabled={true} href="/docs/Web/CSS" title="공사 중">
                  CSS
                </HeaderNavMenuItem>
              </li>
              <li role="menuitem">
                <HeaderNavMenuItem disabled={true} href="/docs/Web/JavaScript" title="공사 중">
                  JavaScript
                </HeaderNavMenuItem>
              </li>
            </HeaderNavMenu>
            <HeaderNavMenu css={{ marginTop: 72 }} role="group" aria-label="다른 곳으로 이동">
              <li role="menuitem">
                <HeaderIntraNavItem href="/">Main Site</HeaderIntraNavItem>
              </li>
              <li role="menuitem">
                <HeaderIntraNavItem href="/post">Blog</HeaderIntraNavItem>
              </li>
            </HeaderNavMenu>
          </Container>
        ),
      }}
    </BaseHeader>
  )
}

export default DocHeader
