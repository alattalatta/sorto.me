import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import React from 'react'

import { styled } from 'utils/styler'

import { Container } from './Container'
import styles from './PostBody.module.scss'
import { Anchor } from './basics'

type Props = {
  children: MdxRemote.Source
}

const PostContent = styled('div', {
  fontFamily: 'sans-serif',
  lineHeight: 1.4,
})

const CalloutContainer = styled('div', {
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  borderLeft: '8px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  margin: '0.5em 0',
  padding: '2rem',
  p: {
    margin: 0,
  },
  '& p + p': {
    marginTop: '1em',
  },
  variants: {
    color: {
      warn: {
        backgroundColor: 'rgba(255, 244, 193, 0.5)',
        borderLeftColor: 'rgba(255, 244, 193, 0.75)',
      },
    },
  },
})

const CalloutBody = styled('div', {
  flex: 1,
})

const CalloutTitle = styled('p', {
  fontWeight: '700',
})

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
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  inlineCode: styled('code', {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
    display: 'inline-block',
    fontFamily: `'Nanum Gothic Coding', monospace`,
    padding: '.2em .4em',
  }),
  Callout,
})

const PostBody: React.VFC<Props> = ({ children }) => {
  const content = hydrate(children, { components: mdxComponents })

  return (
    <Container>
      <PostContent className={styles.prismStyler}>{content}</PostContent>
    </Container>
  )
}

export default PostBody
