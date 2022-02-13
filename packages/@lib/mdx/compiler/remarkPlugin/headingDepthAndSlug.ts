import type Slugger from 'github-slugger'
import type { Heading } from 'mdast'

function headingDepthAndSlug(heading: Heading, slugger: Slugger): void {
  heading.depth += 1
  heading.data = {
    ...heading.data,
    hProperties: {
      ...heading.data?.hProperties,
      id: slugger.slug(toString(heading)),
    },
  }
}

export { headingDepthAndSlug }
