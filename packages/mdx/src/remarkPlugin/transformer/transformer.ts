import Slugger from 'github-slugger'
import type { RootContent, Parent, Root, Box } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { definitionList } from './definitionList'
import { headingDepthAndSlug } from './headingDepthAndSlug'
import { notebox } from './notebox'

export const remarkTransformerPlugin: Plugin<void[], Root> = () => {
  return (tree) => {
    const slugger = new Slugger()

    visit(tree, (node: RootContent, index: number, parent: Parent) => {
      switch (node.type) {
        case 'blockquote':
          notebox(node, index, parent)
          break
        case 'code': {
          const meta = (node.meta || '').split(' ').map((v) => v.trim().split('='))
          const metaAsDataAttrs = meta.reduce(
            (acc, [key, value]) => {
              acc[`data-${key}`] = value ? String(value) : ''
              return acc
            },
            {} as Record<string, string>,
          )

          const div: Box = {
            children: [node],
            data: {
              hName: 'div',
              hProperties: { className: 'codewrap', ...metaAsDataAttrs },
            },
            type: 'box',
          }
          parent.children[index] = div as unknown as RootContent
          break
        }
        case 'heading':
          headingDepthAndSlug(node, slugger)
          break
        case 'list':
          definitionList(slugger, node, index, parent)
          break
        // directives
        case 'containerDirective':
          switch (node.name) {
            case 'badcode': {
              const data = node.data || (node.data = {})
              data.hName = 'div'
              data.hProperties = { className: 'codevar codevar-bad' }
              break
            }
            case 'goodcode': {
              const data = node.data || (node.data = {})
              data.hName = 'div'
              data.hProperties = { className: 'codevar codevar-good' }
              break
            }
          }
          break
        default:
          return
      }
    })
  }
}
