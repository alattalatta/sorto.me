import * as O from 'fp-ts/lib/Option'
import { fst, mapFst, mapSnd } from 'fp-ts/lib/ReadonlyTuple'
import { flow, pipe } from 'fp-ts/lib/function'
import type { Element, Properties, Root as HTMLRoot } from 'hast'
import type { Plugin } from 'unified'
import findAncestor from 'unist-util-ancestor'
import { visit } from 'unist-util-visit'

const ensureCodeAndMeta = (element: Element): O.Option<readonly [Element, string]> =>
  element.tagName === 'code' && element.data?.meta ? O.some([element, element.data.meta as string]) : O.none

const parseMeta = (meta: string): Properties =>
  meta
    .split(' ')
    .map((it) => it.split('=') as [string, string])
    // preserve hidden, convert others as data attributes
    .reduce((acc, [key, value]) => ({ ...acc, [key === 'hidden' ? key : `data-${key}`]: value ?? true }), {})

const rehypeCodeblockDataAttr: Plugin<void[], HTMLRoot> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      pipe(
        ensureCodeAndMeta(node),
        O.map(mapFst((code) => findAncestor(tree, [code]) as Element)),
        O.filter(flow(fst, (el) => el.tagName === 'pre')),
        O.map(mapSnd(parseMeta)),
        O.fold(
          () => undefined,
          ([el, props]) => (el.properties = props),
        ),
      )
    })
  }
}

export { rehypeCodeblockDataAttr }
