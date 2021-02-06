import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { ACCENT_B, BASE40, styled } from 'utils/styler'

import { Anchor, AnchorExternal } from './basics'

export const MDXWrap = styled('div', {
  fontFamily: "'Nanum Gothic', sans-serif",
  '& p': {
    lineHeight: 1.65,
  },
  '& > p': {
    marginTop: 24,
    marginBottom: 24,
  },
})

const INLINE_CODE_STYLES = Object.freeze({
  backgroundColor: 'rgba(0, 0, 0, .05)',
  borderRadius: '4px',
  display: 'inline-block',
  fontFamily: `'Nanum Gothic Coding', monospace`,
  paddingRight: 4,
  paddingLeft: 4,
  textDecorationLine: 'inherit',
})

const CalloutContainer = styled('div', {
  backgroundColor: 'rgba(0, 0, 0, .05)',
  borderLeft: '8px solid rgba(0, 0, 0, .2)',
  borderRadius: '4px',
  margin: '0.5em 0',
  padding: '1.5rem 2rem 1.5rem 1.2rem',
  '& code': INLINE_CODE_STYLES,
  '& p': {
    marginTop: 0,
    marginBottom: 0,
  },
  '& p + p': {
    marginTop: 24,
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

const HeadingAnchor = styled('a', {
  color: ACCENT_B,
  opacity: 0,
  display: 'inline-block',
  paddingRight: 6,
  paddingLeft: 6,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
})

const Heading = styled('h2', {
  color: BASE40,
  [`&:hover ${HeadingAnchor}`]: {
    opacity: 1,
  },
})

const Heading2 = styled(Heading, {
  borderBottom: `1px solid ${BASE40}`,
  fontSize: 28,
  marginTop: 36,
  marginBottom: 28,
  paddingBottom: 8,
})

const Heading3 = styled(Heading, {
  fontSize: 24,
  marginTop: 28,
  marginBottom: 24,
})

const Heading4 = styled(Heading, {
  fontSize: 22,
  marginTop: 24,
  marginBottom: 24,
})

const headingOf = (level: 2 | 3 | 4, Component: typeof Heading = Heading): React.FC => {
  let count = 0

  return ({ children }) => {
    const cc = count++
    const id = `s${level}.${cc}`
    const el = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'

    return (
      <Component as={el} id={id}>
        {children}
        <HeadingAnchor href={`#${id}`} aria-hidden>
          #
        </HeadingAnchor>
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

export const MDX_COMPONENTS: MdxRemote.Components = Object.freeze({
  a: ({ children, href = '' }: JSX.IntrinsicElements['a']) =>
    /^\.|\//.test(href) ? (
      <Anchor href={href}>{children}</Anchor>
    ) : (
      <AnchorExternal href={href}>{children}</AnchorExternal>
    ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <CalloutContainer as="blockquote">{children}</CalloutContainer>
  ),
  h1: headingOf(2, Heading2),
  h2: headingOf(3, Heading3),
  h3: headingOf(4, Heading4),
  img: styled('img', {
    display: 'block',
    maxWidth: '100%',
  }),
  inlineCode: styled('code', INLINE_CODE_STYLES),
  li: styled('li', {
    '& + &': {
      marginTop: 4,
    },
  }),
  Anchor,
  Callout,
})
