import React from 'react'

import { Anchor } from 'components/basics'
import { useUniqueID } from 'hooks/MDX/useUniqueID'
import { childrenToText } from 'utils/element'

import { DeprecatedInline, ExperimentalInline, NonStandardInline } from './Icon'

type Props = {
  deprecated?: boolean
  experimental?: boolean
  monospaced?: boolean
  nonStandard?: boolean
}

export const Term: React.FC<Props> = ({ children, deprecated, experimental, monospaced = true, nonStandard }) => {
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

export const TermLink: React.VFC<{ children: string; monospaced?: boolean; target?: string }> = ({
  children,
  monospaced = true,
  target = children,
}) => {
  const fragment = `#term-${target}`

  const content = monospaced ? <code>{children}</code> : children

  return <Anchor href={fragment}>{content}</Anchor>
}
