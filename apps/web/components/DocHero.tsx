import React from 'react'

import { styled } from 'utils/styler'

import { Anchor, Container } from './basics'

const HeroContainer = styled('header', {
  background: '$base10',
  color: '$base100',
  marginBottom: 36,
  paddingTop: 80,
  paddingBottom: 120,
})

const Title = styled('h1', {
  color: '$base70',
  fontSize: 36,
  fontWeight: 700,
})

const Breadcrumbs = styled('div', {
  color: '$base100',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  lineHeight: 1.45,
  marginTop: 16,
  userSelect: 'none',
})

const BreadcrumbSeparator = styled('span', {
  marginRight: '1ch',
  marginLeft: '1ch',
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
          ? [
              ...prevComps,
              <BreadcrumbSeparator key={index} aria-hidden="true">
                &gt;
              </BreadcrumbSeparator>,
              component,
            ]
          : [...prevComps, component]

      return [href, components]
    },
    ['', []],
  )

  return (
    <HeroContainer>
      <Container>
        <Title>{children}</Title>
        <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      </Container>
    </HeroContainer>
  )
}

export default DocHero
