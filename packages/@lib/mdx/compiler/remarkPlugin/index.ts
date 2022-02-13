import Slugger from 'github-slugger'
import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { callout } from './callout'
import { headingDepthAndSlug } from './headingDepthAndSlug'
import { imageDimension } from './imageDimension'

const remarkPlugin: Plugin<void[], Root> = () => {
  const slugger = new Slugger()

  return (tree) => {
    visit(tree, (node) => {
      switch (node.type) {
        case 'blockquote':
          callout(node)
          break
        case 'heading':
          headingDepthAndSlug(node, slugger)
          break
        case 'image':
          imageDimension(node)
          break
        default:
          return
      }
    })
  }
}

export { remarkPlugin }
