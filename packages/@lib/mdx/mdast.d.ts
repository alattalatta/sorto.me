/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Parent } from 'mdast'

declare module 'mdast' {
  export interface Callout extends Parent {
    severity: 'note' | 'warn' | 'fatal'
    type: 'callout'
  }

  export interface Term extends Parent {
    type: 'term'
  }

  export interface TermDescription extends Parent {
    type: 'termDescription'
  }

  export interface DefinitionList extends Parent {
    children: (Term | TermDescription)[]
    type: 'definitionList'
  }

  type BlockContentMap = {
    callout: Callout
    definitionList: DefinitionList
    term: Term
    termDescription: TermDescription
  }
}
