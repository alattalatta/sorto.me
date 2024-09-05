import type { Element } from 'hast'
import type { DefinitionList, Link, LinkReference, Notebox, Term, TermDescription } from 'mdast'
import { defaultHandlers, type Handlers } from 'mdast-util-to-hast'

export const remarkRehypeHandlers: Handlers = {
  definitionList: (state, node: DefinitionList) => ({
    children: state.all(node),
    properties: { ...node.data?.hProperties },
    type: 'element',
    tagName: 'dl',
  }),
  link: (state, node: Link) => {
    const fromDefault = defaultHandlers.link(state, node)
    const href = String(fromDefault.properties.href)
    if (href.startsWith('http')) {
      fromDefault.properties.target = '_blank'
      fromDefault.properties.rel = 'noopener'
    }

    return fromDefault
  },
  linkReference: (state, node: LinkReference) => {
    const fromDefaultRaw = defaultHandlers.linkReference(state, node)
    if (Array.isArray(fromDefaultRaw)) {
      return fromDefaultRaw
    }

    const fromDefault = fromDefaultRaw as unknown as Element
    const href = String(fromDefault.properties.href)
    if (href.startsWith('http')) {
      fromDefault.properties.target = '_blank'
      fromDefault.properties.rel = 'noopener'
    }

    return fromDefault
  },
  notebox: (state, node: Notebox) => ({
    children: state.all(node),
    properties: { ...node.data?.hProperties, className: `notebox notebox-${node.severity}` },
    type: 'element',
    tagName: 'div',
  }),
  term: (state, node: Term) => ({
    children: state.all(node),
    properties: { ...node.data?.hProperties },
    type: 'element',
    tagName: 'dt',
  }),
  termDescription: (state, node: TermDescription) => ({
    children: state.all(node),
    properties: { ...node.data?.hProperties },
    type: 'element',
    tagName: 'dd',
  }),
}
