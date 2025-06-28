
import { describe, expect, it } from 'vitest'
import { isNodeList, isNodeParagraph, isNodeText } from '../../../remarkPlugin/transformer/refinements'
import type { BlockContent, PhrasingContent } from 'mdast'

describe('refinements', () => {
  it('isNodeList should return true for list nodes', () => {
    const node: BlockContent = { type: 'list', children: [] }
    expect(isNodeList(node)).toBe(true)
  })

  it('isNodeList should return false for non-list nodes', () => {
    const node: BlockContent = { type: 'paragraph', children: [] }
    expect(isNodeList(node)).toBe(false)
  })

  it('isNodeParagraph should return true for paragraph nodes', () => {
    const node: BlockContent = { type: 'paragraph', children: [] }
    expect(isNodeParagraph(node)).toBe(true)
  })

  it('isNodeParagraph should return false for non-paragraph nodes', () => {
    const node: BlockContent = { type: 'list', children: [] }
    expect(isNodeParagraph(node)).toBe(false)
  })

  it('isNodeText should return true for text nodes', () => {
    const node: PhrasingContent = { type: 'text', value: '' }
    expect(isNodeText(node)).toBe(true)
  })

  it('isNodeText should return false for non-text nodes', () => {
    const node: PhrasingContent = { type: 'inlineCode', value: '' }
    expect(isNodeText(node)).toBe(false)
  })
})
