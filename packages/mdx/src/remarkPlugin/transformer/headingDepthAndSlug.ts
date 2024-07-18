import type Slugger from 'github-slugger'
import type { Heading } from 'mdast'
import { toString } from 'mdast-util-to-string'

function headingDepthAndSlug(heading: Heading, slugger: Slugger): void {
  heading.depth += 1
  heading.data = {
    ...heading.data,
    hProperties: {
      ...((heading.data as Record<string, unknown> | undefined)?.hProperties as object),
      id: slugger.slug(toString(heading)),
    },
  }
}

export { headingDepthAndSlug }
