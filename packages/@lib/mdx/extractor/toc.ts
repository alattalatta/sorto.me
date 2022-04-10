import type { Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { selectAll } from 'unist-util-select'

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(() => (tree) => {
    return {
      type: 'root',
      children: selectAll('heading[depth=1]', tree),
    }
  })
  .use(function () {
    this.Compiler = (tree: Root) => {
      return JSON.stringify(tree.children.map((node) => toString(node)))
    }
  })

async function extractTOC(source: string): Promise<readonly string[]> {
  const parsed = await processor.process(source)

  return JSON.parse(parsed.toString())
}

export { extractTOC }
