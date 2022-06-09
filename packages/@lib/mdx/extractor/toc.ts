import Slugger from 'github-slugger'
import type { Heading, Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { selectAll } from 'unist-util-select'
import { visit } from 'unist-util-visit'

import { headingDepthAndSlug } from '../remarkPlugin/headingDepthAndSlug'

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(() => (tree) => {
    const slugger = new Slugger()

    visit(tree, 'heading', (node: Heading) => {
      headingDepthAndSlug(node, slugger)
    })
  })
  .use(() => (tree) => {
    return {
      type: 'root',
      children: selectAll('heading[depth=2]', tree),
    }
  })
  .use(function () {
    this.Compiler = (tree: Root) => {
      return JSON.stringify(
        tree.children.map((node) => {
          const nodeData = node.data as { hProperties: Record<string, string> }
          return [nodeData.hProperties.id, toString(node)]
        }),
      )
    }
  })

async function extractTOC(source: string): Promise<readonly (readonly [string, string])[]> {
  const parsed = await processor.process(source)

  return JSON.parse(parsed.toString()) as [string, string][]
}

export { extractTOC }
