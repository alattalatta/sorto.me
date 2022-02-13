import { head } from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import Slugger from 'github-slugger'
import type { List, PhrasingContent, Root, Text, Term, TermDescription, DefinitionList } from 'mdast'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { isNodeList, isNodeParagraph, isNodeText } from './remarkPlugin/refinements'

const remarkDefinitionList: Plugin<void[], Root> = () => {
  const slugs = new Slugger()

  return (tree) => {
    visit(tree, 'list', (list, index, parent) => {
      const bissectedDL = bissectDefinitionList(list, slugs)
      if (bissectedDL.length === 0) {
        return
      }

      const definitionList: DefinitionList = {
        children: bissectedDL.reduce<(Term | TermDescription)[]>((curValue, [term, definitions]) => {
          return [...curValue, term, ...definitions]
        }, []),
        type: 'definitionList',
      }

      parent.children[index] = definitionList
      return 'skip'
    })
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
      O.getOrElse<Term | null>(() => null),
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
      O.getOrElse<TermDescription[] | null>(() => null),
    )
    if (!definitions) {
      continue
    }

    result.push([term, definitions])
  }

  return result
}
