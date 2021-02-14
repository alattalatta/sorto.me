import React from 'react'

import { styled } from 'utils/styler'

import BaseHeader, { HeaderNavItem, HeaderNavMenu } from './BaseHeader'
import SearchField from './SearchField'
import { Anchor, Container } from './basics'

const Brand = styled(Anchor, {
  background: '$accentY',
  boxShadow: '0 2px 12px rgba(252, 236, 111, 0.6), 0 1px 8px rgba(255, 199, 0, 0.25)',
  color: '$base40',
  display: 'block',
  fontSize: 20,
  padding: '16px 16px 16px 52px',
  textDecoration: 'none',
})

const HeaderIntraNavItem = styled(HeaderNavItem, {
  '&::before': {
    content: '"<"',
    display: 'inline-block',
    marginRight: 24,
  },
})

const BlogHeader: React.VFC = () => {
  return (
    <BaseHeader brightness="dark">
      {{
        brand: <Brand href="/">Sorto.me</Brand>,
        menu: (
          <Container>
            <SearchField />
            <HeaderNavMenu css={{ marginTop: 48 }}>
              <li>
                <HeaderNavItem href="/docs/Web/HTML">HTML</HeaderNavItem>
              </li>
              <li>
                <HeaderNavItem href="/docs/Web/CSS">CSS</HeaderNavItem>
              </li>
              <li>
                <HeaderNavItem href="/docs/Web/JavaScript">JavaScript</HeaderNavItem>
              </li>
            </HeaderNavMenu>
            <HeaderNavMenu css={{ marginTop: 72 }}>
              <li>
                <HeaderIntraNavItem href="/">Main Site</HeaderIntraNavItem>
              </li>
              <li>
                <HeaderIntraNavItem href="/post">Blog</HeaderIntraNavItem>
              </li>
            </HeaderNavMenu>
          </Container>
        ),
      }}
    </BaseHeader>
  )
}

export default BlogHeader
