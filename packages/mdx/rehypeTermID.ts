import Slugger from 'github-slugger'
import type { Root } from 'hast'
import { toString } from 'hast-util-to-string'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const rehypeTermID: Plugin<void[], Root> = () => {
  const slugs = new Slugger()

  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'dt') {
        ;(node.properties || (node.properties = {})).id = `term-${slugs.slug(toString(node))}`
      }
    })
  }
}

export { rehypeTermID }
