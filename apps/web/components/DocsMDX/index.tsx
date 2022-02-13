import { Anchor } from '@lib/ui'
import dynamic from 'next/dynamic'

import { Experimental, Deprecated, NonStandard } from './StatusIcon'

export const DOCS_MDX_COMPONENTS = Object.freeze({
  a: Anchor,
  BrowserCompat: dynamic(() => import('./BrowserCompat')),
  CSSDemo: dynamic(() => import('./CSSDemo')),
  Experimental,
  Deprecated,
  NonStandard,
  HTMLDemo: dynamic(() => import('./HTMLDemo')),
  LiveExample: dynamic(() => import('./LiveExample')),
})
