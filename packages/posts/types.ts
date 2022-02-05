type PostMetadata = {
  /**
   * String representing a date which the post is published. (`yyyy-MM-dd`)
   * @format date
   */
  created: string
  /**
   * A text to feed meta description tag. Defaults to `excerpt`.
   */
  description: string | null
  image: string
  slug: string
  title: string
  /**
   * String representing a date which the post file was last modified. (`yyyy-MM-dd`)
   * @format date
   */
  updated: string
}

type Post = {
  meta: PostMetadata
  slug: string
}

export type { PostMetadata, Post }
