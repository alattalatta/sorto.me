import { head } from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { identity, pipe } from 'fp-ts/lib/function'
import type { Blockquote, Notebox, Parent } from 'mdast'

import { isNodeParagraph, isNodeText } from './refinements'

function notebox(blockquote: Blockquote, index: number, parent: Parent): void {
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

  const severity = text.value.match(/^\[(note|warn|fatal)\]/)?.[1] as 'note' | 'warn' | 'fatal' | undefined
  if (!severity) {
    return
  }

  text.value = text.value.slice(severity.length + 2).trim() // [ + severity + ]
  const noteboxNode: Notebox = {
    children: blockquote.children,
    severity,
    type: 'notebox',
  }

  parent.children[index] = noteboxNode
}

export { notebox }
