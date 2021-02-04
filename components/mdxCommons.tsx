import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { styled } from 'utils/styler'

import { Anchor } from './basics'

export const MDXWrap = styled('div', {
  fontFamily: 'sans-serif',
  lineHeight: 1.4,
})

const INLINE_CODE_STYLES = Object.freeze({
  backgroundColor: 'rgba(0, 0, 0, .05)',
  borderRadius: '4px',
  display: 'inline-block',
  fontFamily: `'Nanum Gothic Coding', monospace`,
  paddingRight: '.4em',
  paddingLeft: '.4em',
})

const CalloutContainer = styled('div', {
  backgroundColor: 'rgba(0, 0, 0, .05)',
  borderLeft: '8px solid rgba(0, 0, 0, .2)',
  borderRadius: '4px',
  margin: '0.5em 0',
  padding: '1.5rem 2rem 1.5rem 1.2rem',
  '& code': INLINE_CODE_STYLES,
  '& p': {
    margin: 0,
  },
  '& p + p': {
    marginTop: '.6em',
  },
  variants: {
    border: {
      none: {
        borderLeft: 0,
        padding: '1.5rem 2rem',
      },
    },
    color: {
      warn: {
        backgroundColor: 'rgba(255, 244, 193, .5)',
        borderLeftColor: 'rgba(255, 244, 193, .75)',
      },
    },
  },
})

const CalloutBody = styled('div', {
  flex: 1,
})

const CalloutTitle = styled('span', {
  display: 'block',
  fontWeight: '700',
  marginBottom: '.2em',
})

const HeadingAnchor = styled(Anchor, {
  color: '#ddd',
  opacity: 0,
  paddingLeft: '.5ch',
  paddingRight: '.5ch',
  position: 'absolute',
  top: 0,
  right: '100%',
  textDecoration: 'none',
})

const Heading = styled('h2', {
  position: 'relative',
  [`&:hover ${HeadingAnchor}`]: {
    opacity: 1,
  },
})

const Heading2 = styled(Heading, {
  borderBottom: '1px solid #e8ebed',
  fontSize: '1.75em',
  paddingBottom: '.25em',
})

const Heading3 = styled(Heading, {
  fontSize: '1.5em',
})

const headingOf = (level: 2 | 3 | 4 | 5, Component: typeof Heading = Heading): React.FC => {
  let count = 0

  return ({ children }) => {
    const cc = count++
    const id = `s${level}.${cc}`
    const el = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'

    return (
      <Component as={el} id={id}>
        <HeadingAnchor href={`#${id}`} aria-hidden>
          #
        </HeadingAnchor>
        {children}
      </Component>
    )
  }
}

const Callout: React.FC<{ as?: React.ElementType; color?: 'warn'; icon?: string; label?: string }> = ({
  as = 'section',
  children,
  color,
  icon,
  label,
}) => (
  <CalloutContainer as={as} css={{ display: 'flex' }} color={color}>
    {icon && <span>{icon}</span>}
    <CalloutBody>
      {label && <CalloutTitle>{label}</CalloutTitle>}
      <p>{children}</p>
    </CalloutBody>
  </CalloutContainer>
)

export const mdxComponents: MdxRemote.Components = Object.freeze({
  a: ({ children, href }: JSX.IntrinsicElements['a']) => (
    <Anchor href={href} rel="noreferrer noopener" target="_blank">
      {children}
    </Anchor>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <CalloutContainer as="blockquote">{children}</CalloutContainer>
  ),
  h1: headingOf(2, Heading2),
  h2: headingOf(3, Heading3),
  h3: headingOf(4),
  h4: headingOf(5),
  img: styled('img', {
    display: 'block',
    maxWidth: '100%',
  }),
  inlineCode: styled('code', INLINE_CODE_STYLES),
  Anchor,
  Callout,
})
