import React from 'react'

import { Anchor } from '../basics'
import * as Callout from './Callout'

const Image: React.VFC<JSX.IntrinsicElements['img']> = ({ alt = '', ...props }) => {
  const [a, width, height] = alt.split(';')

  return <img alt={a} style={{ width, height }} {...props} />
}

export const MDX_COMPONENTS: Record<string, React.ReactNode> = Object.freeze({
  a: Anchor,
  img: Image,
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  Anchor,
  Callout,
})
