import { head } from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import type {
  BlockContent,
  DefinitionContent,
  List,
  ListItem,
  Paragraph,
  PhrasingContent,
  Root as MDRoot,
  Text,
} from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const rehypeDefinitionList: Plugin<void[], MDRoot> = () => {
  return (tree) => {
    visit(tree, 'list', (list) => {
      const bissectedDL = bissectDefinitionList(list)
      if (bissectedDL.length === 0) {
        return
      }

      ;(list.data || (list.data = {})).hName = 'dl'
      list.children = bissectedDL.reduce<ListItem[]>((curValue, [term, definitions]) => {
        return [...curValue, term, ...definitions]
      }, [])
    })
  }
}

export { rehypeDefinitionList }

const isNodeList = (node: BlockContent | DefinitionContent): node is List => node.type === 'list'
const isNodeParagraph = (node: BlockContent | DefinitionContent): node is Paragraph => node.type === 'paragraph'
const isNodeText = (node: PhrasingContent): node is Text => node.type === 'text'

function bissectDefinitionList(node: List): readonly [term: ListItem, definisions: readonly ListItem[]][] {
  if (node.ordered) {
    return []
  }

  const result: [term: ListItem, definisions: readonly ListItem[]][] = []

  for (const listItem of node.children) {
    if (listItem.children.length > 2) {
      return []
    }

    const [fst, snd] = listItem.children

    const term = pipe(
      O.fromNullable(fst),
      O.filter(isNodeParagraph),
      O.chain((child) => head(child.children)),
      O.filter(isNodeText),
      O.filter((child) => child.value.startsWith(':')),
      O.map((text) => text.value.slice(1).trim()),
      O.map(
        (text) =>
          ({ type: 'listItem', children: [{ type: 'text', value: text } as any], data: { hName: 'dt' } } as ListItem),
      ),
      O.getOrElse<ListItem | null>(() => null),
    )
    if (!term) {
      return []
    }

    const definitions = pipe(
      O.fromNullable(snd),
      O.filter(isNodeList),
      O.map((sublist) => sublist.children),
      O.map((sublistItems) =>
        sublistItems.map((sublistItem) => ({ ...sublistItem, data: { ...sublistItem.data, hName: 'dd' } })),
      ),
      O.getOrElse<ListItem[] | null>(() => null),
    )
    if (!definitions) {
      return []
    }

    console.log('===\n', definitions)

    result.push([term, definitions])
  }

  return result
}
