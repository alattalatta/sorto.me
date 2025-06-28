import { describe, expect, it } from 'vitest'
import { definitionList } from '../../../remarkPlugin/transformer/definitionList'
import type { List, Parent } from 'mdast'
import Slugger from 'github-slugger'

describe('definitionList', () => {
  it('should not modify the parent if the list is ordered', () => {
    const list: List = {
      type: 'list',
      ordered: true,
      children: [],
    }
    const parent: Parent = {
      type: 'root',
      children: [list],
    }
    const slugger = new Slugger()
    definitionList(slugger, list, 0, parent)
    expect(parent.children[0].type).toBe('list')
  })

  it('should not modify the parent if a list item has more than 2 children', () => {
    const list: List = {
      type: 'list',
      ordered: false,
      children: [
        {
          type: 'listItem',
          children: [
            { type: 'paragraph', children: [] },
            { type: 'list', children: [] },
            { type: 'paragraph', children: [] },
          ],
        },
      ],
    }
    const parent: Parent = {
      type: 'root',
      children: [list],
    }
    const slugger = new Slugger()
    definitionList(slugger, list, 0, parent)
    expect(parent.children[0].type).toBe('list')
  })

  it('should correctly transform a valid definition list', () => {
    const list: List = {
      type: 'list',
      ordered: false,
      children: [
        {
          type: 'listItem',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', value: ': Term 1' }],
            },
            {
              type: 'list',
              ordered: false,
              children: [
                {
                  type: 'listItem',
                  children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Definition 1' }] }],
                },
              ],
            },
          ],
        },
      ],
    }
    const parent: Parent = {
      type: 'root',
      children: [list],
    }
    const slugger = new Slugger()
    definitionList(slugger, list, 0, parent)
    const definitionListNode = parent.children[0]
    expect(definitionListNode.type).toBe('definitionList')
    if (definitionListNode.type === 'definitionList') {
      expect(definitionListNode.children).toHaveLength(2)
      expect(definitionListNode.children[0].type).toBe('term')
      expect(definitionListNode.children[1].type).toBe('termDescription')
    }
  })
})