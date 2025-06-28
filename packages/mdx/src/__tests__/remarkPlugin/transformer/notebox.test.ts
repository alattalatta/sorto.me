
import { describe, expect, it } from 'vitest'
import { notebox } from '../../../remarkPlugin/transformer/notebox'
import type { Blockquote, Parent } from 'mdast'

describe('notebox', () => {
  it('should convert a blockquote with a severity tag to a notebox', () => {
    const blockquote: Blockquote = {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: '[note] This is a note.' }],
        },
      ],
    }
    const parent: Parent = {
      type: 'root',
      children: [blockquote],
    }
    notebox(blockquote, 0, parent)
    const noteboxNode = parent.children[0]
    expect(noteboxNode.type).toBe('notebox')
    if (noteboxNode.type === 'notebox') {
      expect(noteboxNode.severity).toBe('note')
    }
  })

  it('should not convert a blockquote without a severity tag', () => {
    const blockquote: Blockquote = {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: 'This is a regular blockquote.' }],
        },
      ],
    }
    const parent: Parent = {
      type: 'root',
      children: [blockquote],
    }
    notebox(blockquote, 0, parent)
    expect(parent.children[0].type).toBe('blockquote')
  })
})
