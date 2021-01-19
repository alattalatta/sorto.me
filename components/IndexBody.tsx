import Link from 'next/link'
import React from 'react'

import { styled } from 'utils/styler'

type Props = {
  posts: readonly PostDatum[]
}

export type PostDatum = {
  data: Record<string, string>
  slug: string
}

const List = styled('ul', {
  listStyle: 'none',
})

const IndexBody: React.VFC<Props> = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/post/${post.slug}`}>
            <a>{post.data.title}</a>
          </Link>
        </li>
      ))}
    </List>
  )
}

export default IndexBody
