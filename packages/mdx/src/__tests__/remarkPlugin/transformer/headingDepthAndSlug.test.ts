
import { describe, expect, it } from 'vitest'
import { headingDepthAndSlug } from '../../../remarkPlugin/transformer/headingDepthAndSlug'
import type { Heading } from 'mdast'
import Slugger from 'github-slugger'

describe('headingDepthAndSlug', () => {
  it('should increment heading depth by 2 and add a slug', () => {
    const heading: Heading = {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: 'Test Heading' }],
    }
    const slugger = new Slugger()
    headingDepthAndSlug(heading, slugger)
    expect(heading.depth).toBe(3)
    expect(heading.data?.hProperties).toEqual({ id: 'test-heading' })
  })
})
