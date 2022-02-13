type PostMetadata = {
  /**
   * ISO Datetime string representing a date which the post is published.
   */
  created: string
  /**
   * A text to feed meta description tag.
   */
  description: string | null
  image: string
  slug: string
  title: string
  /**
   * ISO Datetime string representing a date which the post file was last modified.
   */
  updated: string
}

type Post = {
  content: string
  meta: PostMetadata
}

export type { PostMetadata, Post }
