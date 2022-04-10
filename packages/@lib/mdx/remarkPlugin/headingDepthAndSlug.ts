import type Slugger from 'github-slugger'
import type { Heading } from 'mdast'
import { toString } from 'mdast-util-to-string'

function headingDepthAndSlug(heading: Heading, slugger: Slugger): void {
  heading.depth += 1
  heading.data = {
    ...heading.data,
    hProperties: {
      ...(heading.data?.hProperties as unknown as object),
      id: slugger.slug(toString(heading)),
    },
  }
}

export { headingDepthAndSlug }
