import dynamic from 'next/dynamic'

import { MDX_COMPONENTS } from 'components/MDX'

import Demo from './Demo'
import LiveExample from './LiveExample'
import { HTMLAttr, Term, TermLink } from './Term'

export const DOCS_MDX_COMPONENTS = Object.freeze({
  ...MDX_COMPONENTS,
  BrowserCompat: dynamic(() => import('./BrowserCompat')),
  Demo,
  HTMLAttr,
  LiveExample,
  Term,
  TermLink,
})
