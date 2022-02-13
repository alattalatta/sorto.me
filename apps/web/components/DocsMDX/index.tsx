import { Anchor } from '@lib/ui'
import dynamic from 'next/dynamic'

import { Experimental, Deprecated, NonStandard } from './StatusIcon'

export const DOCS_MDX_COMPONENTS = Object.freeze({
  a: Anchor,
  BrowserCompat: dynamic(() => import('./BrowserCompat')),
  CSSDemo: dynamic(() => import('./CSSDemo')),
  HTMLDemo: dynamic(() => import('./HTMLDemo')),
  LiveExample: dynamic(() => import('./LiveExample')),
  Spec: dynamic(() => import('./Spec')),
  Experimental,
  Deprecated,
  NonStandard,
})
