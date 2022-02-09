type DocMetadata = {
  bcd?: string
  description: string | null
  slug: string
  title: string
  /**
   * ISO Datetime string representing a date which the doc file was last modified.
   */
  updated: string
}

type Doc = {
  content: string
  meta: DocMetadata
}

export type { DocMetadata, Doc }
