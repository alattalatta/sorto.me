import { head } from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { identity, pipe } from 'fp-ts/lib/function'
import type { Blockquote } from 'mdast'

import { isNodeParagraph, isNodeText } from './refinements'

function callout(blockquote: Blockquote): void {
  const text = pipe(
    head(blockquote.children),
    O.filter(isNodeParagraph),
    O.chain((paragraph) => head(paragraph.children)),
    O.filter(isNodeText),
    O.fold(() => null, identity),
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
}

export { callout }
