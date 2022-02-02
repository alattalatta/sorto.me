import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'

import { useUniqueID } from 'hooks/MDX/useUniqueID'
import { childrenToText } from 'utils/element'

import { Anchor } from '../basics'
import * as Callout from './Callout'
import * as CodeBlock from './CodeBlock'
import { FloatClear, Floater } from './Floater'
import { UniqueIDProvider } from './UniqueIDContext'
import styles from './styles.module.scss'

type Props = {
  children: MDXRemoteSerializeResult
  components: Record<string, React.ReactNode>
  scope: Record<string, unknown>
}
export const MDXWrap: React.VFC<Props> = ({ children, components, scope }) => {
  return (
    <UniqueIDProvider>
      <div className={styles.wrap}>
        <MDXRemote {...children} components={components} scope={scope} />
      </div>
    </UniqueIDProvider>
  )
}

const headingOf = (level: 2 | 3 | 4): React.FC => {
  const H = `h${level}` as const
  const className = styles[`heading${level}`]

  return ({ children }) => {
    const id = useUniqueID(childrenToText(children))

    return (
      <H className={className} id={id}>
        {children}
        <a className={styles.headingAnchor} href={`#${id}`} aria-hidden="true">
          #
        </a>
      </H>
    )
  }
}

const Image: React.VFC<JSX.IntrinsicElements['img']> = ({ alt = '', ...props }) => {
  const [a, width, height] = alt.split(';')

  return <img alt={a} style={{ width, height }} {...props} />
}

const Table: React.FC = (props) => <table className={styles.table} {...props} />

export const MDX_COMPONENTS: Record<string, React.ReactNode> = Object.freeze({
  a: Anchor,
  em: 'i',
  pre: CodeBlock.Root,
  code: CodeBlock.Body,
  h1: headingOf(2),
  h2: headingOf(3),
  h3: headingOf(4),
  img: Image,
  table: Table,
  Anchor,
  FloatClear,
  Floater,
})

export const MDX_SCOPE: Record<string, unknown> = Object.freeze({
  Callout,
})
