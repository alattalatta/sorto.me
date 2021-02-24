import React from 'react'

import { Anchor } from 'components/basics'
import { useUniqueID } from 'hooks/MDX/useUniqueID'
import { childrenToText } from 'utils/element'

import { DeprecatedInline, ExperimentalInline, NonStandardInline } from '../MDX/Icon'

type TermProps = {
  deprecated?: boolean
  experimental?: boolean
  monospaced?: boolean
  nonStandard?: boolean
}

export const Term: React.FC<TermProps> = ({ children, deprecated, experimental, monospaced = true, nonStandard }) => {
  const id = useUniqueID(`term-${childrenToText(children)}`)

  const content = monospaced ? <code>{children}</code> : children

  return (
    <dt id={id}>
      {content}
      {nonStandard && <NonStandardInline />}
      {deprecated && <DeprecatedInline />}
      {experimental && <ExperimentalInline />}
    </dt>
  )
}

type TermLinkProps = {
  doc?: string
  monospace?: boolean
  target?: string
}

export const TermLink: React.FC<TermLinkProps> = ({ children, doc, monospace = true, target = children }) => {
  const fragment = `#term-${target}`
  const href = doc ? `${doc}${fragment}` : fragment

  const content = monospace ? <code>{children}</code> : children

  return <Anchor href={href}>{content}</Anchor>
}

export const HTMLAttr: React.FC<{ element?: string } & TermLinkProps> = ({ element, ...props }) => {
  const subpath = element ? `Element/${element}` : 'Global_attributes'
  const doc = `/docs/Web/HTML/${subpath}`

  return <TermLink doc={doc} {...props} />
}
