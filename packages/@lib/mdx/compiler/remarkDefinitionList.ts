/// <reference types="../mdast" />

import { head } from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { identity, pipe } from 'fp-ts/lib/function'
import Slugger from 'github-slugger'
import type { List, Parent, PhrasingContent, Root, Text, Term, TermDescription, DefinitionList } from 'mdast'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { isNodeList, isNodeParagraph, isNodeText } from './remarkPlugin/refinements'

const remarkDefinitionList: Plugin<void[], Root> = () => {
  const slugs = new Slugger()

  return (tree) => {
    // TS is too slow to dig this deeper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(visit as any)(tree, 'list', (list: List, index: number, parent: Parent | null) => {
      const bissectedDL = bissectDefinitionList(list, slugs)
      if (index === null || !parent || bissectedDL.length === 0) {
        return
      }

      const definitionList: DefinitionList = {
        children: bissectedDL.reduce<(Term | TermDescription)[]>((curValue, [term, definitions]) => {
          return [...curValue, term, ...definitions]
        }, []),
        type: 'definitionList',
      }

      parent.children[index] = definitionList
    })()
  }
}

export { remarkDefinitionList }

function bissectDefinitionList(
  node: List,
  slugger: Slugger,
): readonly [term: Term, definisions: readonly TermDescription[]][] {
  if (node.ordered) {
    return []
  }

  const result: [term: Term, definisions: readonly TermDescription[]][] = []

  for (const listItem of node.children) {
    if (listItem.children.length > 2) {
      return []
    }

    const [fst, snd] = listItem.children

    const term = pipe(
      O.fromNullable(fst),
      O.filter(isNodeParagraph),
      O.map((paragraph) => paragraph.children),
      O.filter((children): children is [Text, ...PhrasingContent[]] =>
        pipe(
          head(children),
          O.filter(isNodeText),
          O.filter((descendant) => descendant.value.startsWith(': ')),
          O.isSome,
        ),
      ),
      O.map((children) => {
        const [text, ...otherChildren] = children
        const termNode: Term = {
          children: [
            {
              ...text,
              value: text.value.slice(2), // exclude the leading ': '
            },
            ...otherChildren,
          ],
          data: {
            hProperties: {
              id: slugger.slug(`term-${toString(otherChildren)}`),
            },
          },
          type: 'term',
        }
        return termNode
      }),
      O.fold(() => null, identity),
    )
    if (!term) {
      continue
    }

    const definitions = pipe(
      O.fromNullable(snd),
      O.filter(isNodeList),
      O.map((sublist) => sublist.children),
      O.map((sublistItems) =>
        sublistItems.map<TermDescription>((sublistItem) => ({
          children: sublistItem.children,
          type: 'termDescription',
        })),
      ),
      O.fold(() => null, identity),
    )
    if (!definitions) {
      continue
    }

    result.push([term, definitions])
  }

  return result
}
