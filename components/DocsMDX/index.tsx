import { MdxRemote } from 'next-mdx-remote/types'
import dynamic from 'next/dynamic'

import { MDX_COMPONENTS } from 'components/MDX'

import LiveExample from './LiveExample'

export const DOCS_MDX_COMPONENTS: MdxRemote.Components = Object.freeze({
  ...MDX_COMPONENTS,
  BrowserCompat: dynamic(() => import('./BrowserCompat')),
  LiveExample,
})
