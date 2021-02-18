import clsx from 'clsx'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import dynamic from 'next/dynamic'
import React from 'react'

import { useUniqueID } from 'hooks/MDX/useUniqueID'
import { childrenToText } from 'utils/element'

import { Anchor } from '../basics'
import Callout, { CalloutCite } from './Callout'
import { Code, CodeBlock } from './CodeBlock'
import { UniqueIDProvider } from './UniqueIDContext'
import styles from './styles.module.scss'

/** Non-hydrated MDX contents wrapper. */
const MDXStatic: React.VFC<{ children: string; className?: string }> = ({ children, className }) => (
  <div className={clsx(styles.wrap, className)} dangerouslySetInnerHTML={{ __html: children }} />
)

/** Hydrated MDX contents wrapper. */
const MDXHydrated: React.FC<{ className?: string }> = ({ children, className }) => (
  <div className={clsx(styles.wrap, className)}>{children}</div>
)

type Props = {
  children: MdxRemote.Source
  className?: string
  components: MdxRemote.Components
}
export const MDXWrap: React.VFC<Props> = ({ children, className, components }) => {
  const content = hydrate(children, {
    components,
    provider: { component: UniqueIDProvider, props: {} },
  }) as React.ReactElement

  // pretty lame but uh
  // should properly handle when https://github.com/hashicorp/next-mdx-remote/issues/88 gets resolved
  // not "content.type", because it'll be wrapped in HeadingContext
  const childrenType = content.props.children?.type || 'div'

  return childrenType === 'div' ? (
    <MDXStatic className={className}>{children.renderedOutput}</MDXStatic>
  ) : (
    <MDXHydrated className={className}>{content}</MDXHydrated>
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
        <a className={styles.headingAnchor} href={`#${id}`} aria-hidden>
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

const Term: React.FC<{ monospaced?: boolean }> = ({ children, monospaced = true }) => {
  const id = useUniqueID(`term-${childrenToText(children)}`)

  const content = monospaced ? <code>{children}</code> : children

  return <dt id={id}>{content}</dt>
}

const TermLink: React.VFC<{ children: string; monospaced?: boolean; target?: string }> = ({
  children,
  monospaced = true,
  target = children,
}) => {
  const fragment = `#term-${target}`

  const content = monospaced ? <code>{children}</code> : children

  return <Anchor href={fragment}>{content}</Anchor>
}

export const MDX_COMPONENTS: MdxRemote.Components = Object.freeze({
  a: Anchor,
  code: Code,
  pre: CodeBlock,
  h1: headingOf(2),
  h2: headingOf(3),
  h3: headingOf(4),
  img: Image,
  Anchor,
  BrowserCompat: dynamic(() => import('./BrowserCompat'), { ssr: false }),
  Callout,
  CalloutCite,
  Term,
  TermLink,
})
