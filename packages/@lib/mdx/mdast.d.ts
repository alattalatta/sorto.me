/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Parent } from 'mdast'

declare module 'mdast' {
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
    term: Term
    termDescription: TermDescription
  }
}
