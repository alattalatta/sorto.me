/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Parent } from 'mdast'

declare module 'mdast' {
  export interface Notebox extends Parent {
    severity: 'note' | 'warn' | 'fatal'
    type: 'notebox'
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
    definitionList: DefinitionList
    notebox: Notebox
    term: Term
    termDescription: TermDescription
  }
}
