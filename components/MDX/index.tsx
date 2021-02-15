import clsx from 'clsx'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useRef } from 'react'

import { childrenToText } from 'utils/element'

import { Anchor } from '../basics'
import Callout, { CalloutCite } from './Callout'
import { CodeBlock, CodeBlockBad, CodeBlockGood } from './CodeBlock'
import styles from './styles.module.scss'

const HeadingIDContext = createContext<Map<string, number> | null>(null)
export const HeadingContext: React.FC = ({ children }) => {
  const map = useRef(new Map<string, number>()).current
  const router = useRouter()

  useEffect(() => {
    const clearMapWhenRouteChanges = () => map.clear()
    router.events.on('routeChangeStart', clearMapWhenRouteChanges)

    return () => router.events.off('routeChangeStart', clearMapWhenRouteChanges)
  }, [])

  return <HeadingIDContext.Provider value={map}>{children}</HeadingIDContext.Provider>
}

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
    provider: { component: HeadingContext, props: {} },
  }) as React.ReactElement

  // pretty lame but uh
  // should properly handle when https://github.com/hashicorp/next-mdx-remote/issues/88 gets resolved
  return content.type === 'div' ? (
    <MDXStatic className={className}>{children.renderedOutput}</MDXStatic>
  ) : (
    <MDXHydrated className={className}>{content}</MDXHydrated>
  )
}

const headingOf = (level: 2 | 3 | 4): React.FC => {
  const H = `h${level}` as const
  const className = styles[`heading${level}`]

  return ({ children }) => {
    const headingIDContext = useContext(HeadingIDContext)

    const textContent = childrenToText(children)
      .replace(/\s/g, '-')
      .replace(/[!@#$%^&*()=+~`'"/\\?.,<>[\]|{}]/g, '')

    const count = headingIDContext?.get(textContent) || 0
    const id = count ? `${textContent}-${count}` : textContent
    headingIDContext?.set(textContent, count + 1)

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
