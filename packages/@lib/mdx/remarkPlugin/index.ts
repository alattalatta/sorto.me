import Slugger from 'github-slugger'
import type { Content, Parent, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { headingDepthAndSlug } from './headingDepthAndSlug'
import { imageCustomSize } from './imageCustomSize'
import { notebox } from './notebox'

const remarkPlugin: Plugin<void[], Root> = () => {
  const slugger = new Slugger()

  return (tree) => {
    visit(tree, (node: Content, index: number, parent: Parent) => {
      switch (node.type) {
        case 'blockquote':
          notebox(node, index, parent)
          break
        case 'heading':
          headingDepthAndSlug(node, slugger)
          break
        case 'image':
          imageCustomSize(node)
          break
        default:
          return
      }
    })
  }
}

export { remarkPlugin }
