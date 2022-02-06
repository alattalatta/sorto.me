import React from 'react'

import { useUniqueID } from 'hooks/MDX/useUniqueID'
import { childrenToText } from 'utils/element'

import { Anchor } from '../basics'
import * as Callout from './Callout'
import * as CodeBlock from './CodeBlock'
import { FloatClear, Floater } from './Floater'
import styles from './styles.module.scss'

const headingOf = (level: 2 | 3 | 4): React.FC => {
  const H = `h${level}` as const
  const className = styles[`heading${level}`]

  return ({ children }) => {
    const id = useUniqueID(childrenToText(children))

    return (
      <H className={className} id={id}>
        {children}
        <a aria-hidden="true" className={styles.headingAnchor} href={`#${id}`}>
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
  pre: CodeBlock.Root,
  code: CodeBlock.Body,
  table: Table,
  Anchor,
  Callout,
  FloatClear,
  Floater,
})
