import Slugger from 'github-slugger'
import type { RootContent, Parent, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { definitionList } from './definitionList'
import { headingDepthAndSlug } from './headingDepthAndSlug'
import { notebox } from './notebox'

const remarkPlugin: Plugin<void[], Root> = () => {
  const slugger = new Slugger()

  return (tree) => {
    visit(tree, (node: RootContent, index: number, parent: Parent) => {
      switch (node.type) {
        case 'blockquote':
          notebox(node, index, parent)
          break
        case 'heading':
          headingDepthAndSlug(node, slugger)
          break
        case 'list':
          definitionList(slugger, node, index, parent)
          break
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

export { remarkPlugin }
