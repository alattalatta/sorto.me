import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import React, { createElement } from 'react'

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

const headingOf = (level: 2 | 3 | 4): React.FC => ({ children }) => createElement(`h${level}`, undefined, children)

export const mdxComponents: MdxRemote.Components = Object.freeze({
  a: ({ children, href }: JSX.IntrinsicElements['a']) => (
    <Anchor href={href} rel="noreferrer noopener" target="_blank">
      {children}
    </Anchor>
  ),
  blockquote: styled('blockquote', {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
    margin: '0.5em 0',
    padding: '2rem',
    p: {
      margin: 0,
    },
    '& p + p': {
      marginTop: '1em',
    },
  }),
  h1: headingOf(2),
  h2: headingOf(3),
  h3: headingOf(4),
  inlineCode: styled('code', {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
    display: 'inline-block',
    fontFamily: `'Nanum Gothic Coding', monospace`,
    padding: '.2em .4em',
  }),
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
