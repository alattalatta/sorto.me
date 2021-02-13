import clsx from 'clsx'
import { MdxRemote } from 'next-mdx-remote/types'
import dynamic from 'next/dynamic'
import React from 'react'

import { childrenToText } from 'utils/element'

import { Anchor } from '../basics'
import Callout, { CalloutCite } from './Callout'
import prism from './prism.module.scss'
import styles from './styles.module.scss'

export const MDXWrap: React.FC<{ className?: string }> = ({ children, className }) => (
  <div className={clsx(styles.wrap, className)}>{children}</div>
)

const CodeBlockBad: React.VFC = () => <span className={styles.codeBlockBad} />
const CodeBlockGood: React.VFC = () => <span className={styles.codeBlockGood} />

const CodeBlock: React.FC = ({ children }) => <pre className={clsx(styles.codeBlock, prism.prism)}>{children}</pre>

const headingOf = (level: 2 | 3 | 4): React.FC => {
  // prevent duplicate id
  const idMap = new Map<string, number>()
  const H = `h${level}` as const
  const className = styles[`heading${level}`]

  return ({ children }) => {
    const textContent = childrenToText(children)
      .replace(/\s/g, '-')
      .replace(/[!@#$%^&*()=+~`'"/\\?.,<>[\]|{}]/g, '')

    const count = idMap.get(textContent) || 0
    const id = count ? `${textContent}-${count}` : textContent
    idMap.set(textContent, count + 1)

    return (
      <H className={className} id={id}>
        {children}
        <a className={styles.headingAnchor} href={`#${id}`} aria-hidden>
          #
        </a>
      </H>
    )
  }
}

export const MDX_COMPONENTS: MdxRemote.Components = Object.freeze({
  a: Anchor,
  pre: CodeBlock,
  h1: headingOf(2),
  h2: headingOf(3),
  h3: headingOf(4),
  Anchor,
  BrowserCompat: dynamic(() => import('./BrowserCompat'), { ssr: false }),
  Callout,
  CalloutCite,
  CodeBlockBad,
  CodeBlockGood,
})
