/// <reference types="mdast-util-directive" />

import type { Parent } from 'mdast'

declare module 'mdast' {
  export interface Notebox extends Parent {
    children: Array<BlockContent | DefinitionContent>;
    severity: 'note' | 'warn' | 'fatal'
    type: 'notebox'
  }

  export interface Term extends Parent {
    type: 'term'
  }

  export interface TermDescription extends Parent {
    children: Array<BlockContent | DefinitionContent>;
    type: 'termDescription'
  }

  export interface DefinitionList extends Parent {
    children: (Term | TermDescription)[]
    type: 'definitionList'
  }


  interface RootContentMap {
    definitionList: DefinitionList
    notebox: Notebox
    term: Term
    termDescription: TermDescription
  }
  interface BlockContentMap {
    definitionList: DefinitionList
    notebox: Notebox
    term: Term
    termDescription: TermDescription
  }
}
