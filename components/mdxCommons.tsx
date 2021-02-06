import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { ACCENT_B, ACCENT_R, ACCENT_Y, BASE100, BASE40, CORNER_RADIUS, styled } from 'utils/styler'

import { Anchor, AnchorExternal } from './basics'

export const MDXWrap = styled('div', {
  fontFamily: "'Nanum Gothic', sans-serif",
  '& > p': {
    lineHeight: 1.65,
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

const CalloutContainer = styled('figure', {
  backgroundColor: BASE100,
  borderRadius: CORNER_RADIUS,
  margin: '32px 0',
  overflow: 'hidden',
  '& code': INLINE_CODE_STYLES,
  variants: {
    color: {
      warn: {
        backgroundColor: '#FFFCE8',
      },
      alert: {
        backgroundColor: '#FFEDED',
      },
    },
  },
})

const CalloutCaption = styled('figcaption', {
  borderLeft: `8px solid ${ACCENT_B}`,
  color: BASE40,
  fontWeight: 700,
  padding: '12px 24px 12px 16px',
  variants: {
    color: {
      warn: {
        borderLeftColor: ACCENT_Y,
      },
      alert: {
        backgroundColor: ACCENT_R,
        color: ACCENT_R,
      },
    },
  },
})

const CalloutCite: React.VFC<{ children: string; href: string }> = ({ children, href }) => {
  return (
    <cite>
      <AnchorExternal href={href}>{children}</AnchorExternal>
    </cite>
  )
}

const CalloutBody = styled('div', {
  lineHeight: 1.65,
  margin: 0,
  padding: '12px 24px 24px',
  '& > p': {
    margin: 0,
  },
  '& > p + p': {
    marginTop: 16,
  },
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

const Callout: React.FC<{ childAs?: React.ElementType; color?: 'warn' | 'alert'; label: React.ReactNode }> = ({
  childAs = 'p',
  children,
  color,
  label,
}) => (
  <CalloutContainer color={color}>
    <CalloutCaption color={color}>{label}</CalloutCaption>
    <CalloutBody as={childAs}>{children}</CalloutBody>
  </CalloutContainer>
)

export const MDX_COMPONENTS: MdxRemote.Components = Object.freeze({
  a: ({ children, href = '' }: JSX.IntrinsicElements['a']) =>
    /^\.|\//.test(href) ? (
      <Anchor href={href}>{children}</Anchor>
    ) : (
      <AnchorExternal href={href}>{children}</AnchorExternal>
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
  AnchorExternal,
  Callout,
  CalloutCite,
})
