import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const rehypeWrapTable: Plugin<void[], Root> = () => {
  return (tree) => {
    // TS is too slow to dig this deeper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(visit as any)(tree, 'element', (node: Element, index: number, parent: Element) => {
      if (node.tagName !== 'table') {
        return
      }

      if (!parent || index === null) {
        return
      }

      const childrenBefore = parent.children.slice(0, index)
      const childrenAfter = parent.children.slice(index + 1)

      parent.children = [
        ...childrenBefore,
        {
          children: [node],
          properties: {
            className: 'table-wrap',
          },
          tagName: 'div',
          type: 'element',
        },
        ...childrenAfter,
      ]

      // there can't be a nested table
      return 'skip'
    })
  }
}

export { rehypeWrapTable }
