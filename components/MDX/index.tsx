import { MdxRemote } from 'next-mdx-remote/types'
import dynamic from 'next/dynamic'
import React from 'react'

import { childrenToText } from 'utils/element'
import { styled } from 'utils/styler'

import { Anchor } from '../basics'
import Callout, { CalloutCite } from './Callout'
import { INLINE_CODE_STYLES } from './shared'

export const MDXWrap = styled('div', {
  fontFamily: "'Nanum Gothic', sans-serif",
  '& > p': {
    lineHeight: 1.65,
    marginTop: 24,
    marginBottom: 24,
  },
})

const CodeBlockBad = styled('span', {
  backgroundColor: '#FFEDED',
  position: 'absolute',
  visibility: 'hidden',
})

const CodeBlockGood = styled('span', {
  backgroundColor: '#F2FFED',
  position: 'absolute',
  visibility: 'hidden',
})

const CodeBlock = styled('pre', {
  backgroundColor: '$base100',
  borderRadius: '$cornerRadius',
  colors: '$base40',
  direction: 'ltr',
  fontSize: 14,
  hyphens: 'none',
  lineHeight: 1.375,
  marginTop: 24,
  marginBottom: 24,
  padding: 16,
  tabSize: 2,
  whiteSpace: 'pre',
  wordBreak: 'normal',
  wordSpacing: 'normal',
  [`${CodeBlockBad} + &`]: {
    backgroundColor: '#FFEDED',
  },
  [`${CodeBlockGood} + &`]: {
    backgroundColor: '#F2FFED',
  },
})

const HeadingAnchor = styled('a', {
  color: '$accentB',
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
  color: '$base40',
  [`&:hover ${HeadingAnchor}`]: {
    opacity: 1,
  },
})

const Heading2 = styled(Heading, {
  borderBottom: '1px solid $base40',
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
  fontSize: 20,
  marginTop: 24,
  marginBottom: 24,
})

const headingOf = (level: 2 | 3 | 4, Component: typeof Heading = Heading): React.FC => {
  // prevent duplicate id
  const idMap = new Map<string, number>()
  const el = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'

  return ({ children }) => {
    const textContent = childrenToText(children)
      .replace(/\s/g, '-')
      .replace(/[!@#$%^&*()=+~`'"/\\?.,<>[\]|{}]/g, '')

    const count = idMap.get(textContent) || 0
    const id = count ? `${textContent}-${count}` : textContent
    idMap.set(textContent, count + 1)

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

export const MDX_COMPONENTS: MdxRemote.Components = Object.freeze({
  a: Anchor,
  pre: CodeBlock,
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
      marginTop: 8,
    },
  }),
  Anchor,
  BrowserCompat: dynamic(() => import('./BrowserCompat'), { ssr: false }),
  Callout,
  CalloutCite,
  CodeBlockBad,
  CodeBlockGood,
})
