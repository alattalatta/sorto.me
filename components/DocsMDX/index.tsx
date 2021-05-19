import dynamic from 'next/dynamic'

import { MDX_COMPONENTS } from 'components/MDX'

import Demo from './Demo'
import PolyCodeBlock from './PolyCodeBlock'
import { HTMLAttr, Term, TermLink } from './Term'

export const DOCS_MDX_COMPONENTS = Object.freeze({
  ...MDX_COMPONENTS,
  code: PolyCodeBlock,
  BrowserCompat: dynamic(() => import('./BrowserCompat')),
  Demo,
  HTMLAttr,
  HTMLDemo: dynamic(() => import('./HTMLDemo')),
  LiveExample: dynamic(() => import('./LiveExample')),
  Term,
  TermLink,
})
