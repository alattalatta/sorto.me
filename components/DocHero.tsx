import React from 'react'

import { BASE10, BASE100, BASE70, styled } from 'utils/styler'

import { Anchor, AnchorExternal, Container } from './basics'

const HeroContainer = styled('header', {
  background: BASE10,
  color: BASE100,
  marginBottom: 40,
  paddingTop: 132,
  paddingBottom: 88,
})

const Title = styled('h1', {
  color: BASE70,
  fontSize: 32,
  fontWeight: 700,
  marginTop: 0,
  marginBottom: 0,
})

const SubContainer = styled('div', {
  color: BASE100,
  display: 'flex',
  alignItems: 'center',
  marginTop: 16,
})

const Breadcrumbs = styled('nav', {
  display: 'flex',
  fontFamily: "'Nanum Gothic', sans-serif",
  marginTop: 0,
  marginBottom: 0,
  userSelect: 'none',
})

const BreadcrumbSeparator = styled('span', {
  marginRight: 5,
  marginLeft: 5,
})

const MDNLink = styled(AnchorExternal, {
  fontSize: 12,
  marginLeft: 12,
})

type Props = {
  children: string
  slugs: string[]
}

const DocHero: React.VFC<Props> = ({ children, slugs }) => {
  const [, breadcrumbs] = slugs.reduce<[string, React.ReactNodeArray]>(
    ([prevPath, prevComps], cur, index) => {
      const href = `${prevPath}/${cur}`
      const component =
        index === slugs.length - 1 ? (
          <span key={href}>{cur}</span>
        ) : (
          <Anchor key={href} href={`/docs${href}`}>
            {cur}
          </Anchor>
        )

      // insert '>' when appropriate
      const components =
        index > 0
          ? [...prevComps, <BreadcrumbSeparator key={index}>&gt;</BreadcrumbSeparator>, component]
          : [...prevComps, component]

      return [href, components]
    },
    ['', []],
  )

  return (
    <HeroContainer>
      <Container>
        <Title>{children}</Title>
        <SubContainer>
          <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
          <MDNLink href={`https://developer.mozilla.org/ko/${slugs.join('/')}`}>MDN에서 보기</MDNLink>
        </SubContainer>
      </Container>
    </HeroContainer>
  )
}

export default DocHero
