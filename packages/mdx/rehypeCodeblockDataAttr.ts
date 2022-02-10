import type { Element, Properties, Root } from 'hast'
import type { Plugin } from 'unified'
import findAncestor from 'unist-util-ancestor'
import { visit } from 'unist-util-visit'

const parseMeta = (meta: string): Properties =>
  meta
    .split(' ')
    .map((it) => it.split('=') as [string, string])
    // preserve hidden, convert others as data attributes
    .reduce((acc, [key, value]) => ({ ...acc, [key === 'hidden' ? key : `data-${key}`]: value ?? true }), {})

const rehypeCodeblockDataAttr: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'code') {
        return
      }

      const ancestor = findAncestor(tree, [node]) as Element
      if (ancestor.tagName !== 'pre') {
        return
      }

      ancestor.properties = {
        ...parseMeta((node.data?.meta as string) || ''),
        className: node.properties?.className,
      }
    })
  }
}

export { rehypeCodeblockDataAttr }
