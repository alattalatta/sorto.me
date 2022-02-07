type DocMetadata = {
  bcd?: string
  /** Escaped version of `excerpt`. */
  description: string | null
  slug: string
  title: string
  /**
   * String representing a date which the doc file was last modified. (`yyyy-MM-dd`)
   * @format date
   */
  updated: string
}

type Doc = {
  content: string
  meta: DocMetadata
}

export type { DocMetadata, Doc }
