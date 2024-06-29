import type { Element, Properties, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const parseMeta = (meta: string): Properties =>
  meta
    .split(' ')
    .map((it) => it.split('=') as [string, string])
    // preserve hidden, convert others as data attributes
    .reduce((acc, [key, value]) => ({ ...acc, [key === 'hidden' ? key : `data-${key}`]: value ?? true }), {})

export const rehypeCodeblockDataAttr: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element, _: number, parent: Element) => {
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
        ...parseMeta((node.data as Record<string, string> | undefined)?.meta || ''),
        className: node.properties?.className,
      }

      // there can't be a nested codeblock
      return 'skip'
    })
  }
}
