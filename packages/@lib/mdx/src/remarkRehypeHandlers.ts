import type { DefinitionList, Notebox, Term, TermDescription } from 'mdast'
import type { Handlers } from 'mdast-util-to-hast'

export const remarkRehypeHandlers: Handlers = {
  definitionList: (state, node: DefinitionList) => ({
    children: state.all(node),
    properties: {},
    type: 'element',
    tagName: 'dl',
  }),
  notebox: (state, node: Notebox) => ({
    children: state.all(node),
    properties: { className: `notebox notebox-${node.severity}` },
    type: 'element',
    tagName: 'div',
  }),
  term: (state, node: Term) => ({
    children: state.all(node),
    properties: {},
    type: 'element',
    tagName: 'dt',
  }),
  termDescription: (state, node: TermDescription) => ({
    children: state.all(node),
    properties: {},
    type: 'element',
    tagName: 'dd',
  }),
}
