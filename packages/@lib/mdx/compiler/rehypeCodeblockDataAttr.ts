import type { Properties, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const parseMeta = (meta: string): Properties =>
  meta
    .split(' ')
    .map((it) => it.split('=') as [string, string])
    // preserve hidden, convert others as data attributes
    .reduce((acc, [key, value]) => ({ ...acc, [key === 'hidden' ? key : `data-${key}`]: value ?? true }), {})

const rehypeCodeblockDataAttr: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'code') {
        return
      }

      if (parent?.type !== 'element') {
        return
      }
      if (parent.tagName !== 'pre') {
        return
      }

      parent.properties = {
        ...parseMeta((node.data?.meta as string) || ''),
        className: node.properties?.className,
      }

      // there can't be a nested codeblock
      return 'skip'
    })
  }
}

export { rehypeCodeblockDataAttr }
