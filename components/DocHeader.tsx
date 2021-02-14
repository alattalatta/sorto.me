import React from 'react'

import { styled } from 'utils/styler'

import BaseHeader, { HeaderNavItem, HeaderNavMenu } from './BaseHeader'
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

const HeaderIntraNavItem = styled(HeaderNavItem, {
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
            <SearchField placeholder="Docs 검색..." />
            <HeaderNavMenu css={{ marginTop: 48 }} role="group" aria-label="문서 링크">
              <li role="menuitem">
                <HeaderNavItem href="/docs/Web/HTML">HTML</HeaderNavItem>
              </li>
              <li role="menuitem">
                <HeaderNavItem href="/docs/Web/CSS">CSS</HeaderNavItem>
              </li>
              <li role="menuitem">
                <HeaderNavItem href="/docs/Web/JavaScript">JavaScript</HeaderNavItem>
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
