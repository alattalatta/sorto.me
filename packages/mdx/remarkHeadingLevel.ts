import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const remarkHeadingLevel: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, 'heading', (heading) => {
      heading.depth += 1
    })
  }
}

export { remarkHeadingLevel }
