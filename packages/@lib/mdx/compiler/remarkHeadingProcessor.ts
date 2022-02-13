import Slugger from 'github-slugger'
import type { Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const remarkHeadingProcessor: Plugin<void[], Root> = () => {
  const slugs = new Slugger()

  return (tree) => {
    visit(tree, 'heading', (heading) => {
      heading.depth += 1
      heading.data = {
        ...heading.data,
        hProperties: {
          ...heading.data?.hProperties,
          id: slugs.slug(toString(heading)),
        },
      }
    })
  }
}

export { remarkHeadingProcessor }
