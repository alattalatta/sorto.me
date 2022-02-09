import dynamic from 'next/dynamic'

import { MDX_COMPONENTS } from 'components/MDX'

import PolyCodeBlock from './PolyCodeBlock'
import { Experimental, Deprecated, NonStandard } from './StatusIcon'

export const DOCS_MDX_COMPONENTS = Object.freeze({
  ...MDX_COMPONENTS,
  code: PolyCodeBlock,
  BrowserCompat: dynamic(() => import('./BrowserCompat')),
  CSSDemo: dynamic(() => import('./CSSDemo')),
  Experimental,
  Deprecated,
  NonStandard,
  HTMLDemo: dynamic(() => import('./HTMLDemo')),
  LiveExample: dynamic(() => import('./LiveExample')),
})
