import { head } from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import type { Root, BlockContent, DefinitionContent, Paragraph, PhrasingContent, Text } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const isNodeParagraph = (node: BlockContent | DefinitionContent): node is Paragraph => node.type === 'paragraph'
const isNodeText = (node: PhrasingContent): node is Text => node.type === 'text'

const remarkCallout: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (blockquote) => {
      const text = pipe(
        head(blockquote.children),
        O.filter(isNodeParagraph),
        O.chain((paragraph) => head(paragraph.children)),
        O.filter(isNodeText),
        O.getOrElse<Text | null>(() => null),
      )
      if (!text) {
        return
      }

      const calloutType = text.value.match(/^\[(note|warn|fatal)\]/)?.[1]
      if (!calloutType) {
        return
      }

      blockquote.data = {
        ...blockquote.data,
        hName: 'div',
        hProperties: {
          className: `callout callout-${calloutType}`,
        },
      }
      text.value = text.value.slice(calloutType.length + 2).trim() // [ + calloutType + ]
    })
  }
}

export { remarkCallout }
