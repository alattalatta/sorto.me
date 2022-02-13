import type { PostMetadata } from '@contents/posts'
import { Post, styled } from '@lib/ui'
import Link from 'next/link'

type Props = {
  posts: readonly PostMetadata[]
}

const Root = styled('main', {
  maxWidth: `${412 / 16}rem`,
  display: 'grid',
  gap: '1.5rem',
  gridTemplateColumns: 'none',
  margin: 'auto',
  padding: '1rem 0',
  '@w2': {
    maxWidth: `${824 / 16}rem`,
    gridTemplateColumns: '1fr 1fr',
  },
})

const AnchorNoStyle = styled('a', {
  color: 'inherit',
  textDecoration: 'none',
})

const PostFillHeight = styled(Post, {
  height: '100%',
})

const PostsBody: React.VFC<Props> = ({ posts }) => {
  return (
    <Root>
      {posts.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          <AnchorNoStyle href={`/posts/${post.slug}`}>
            <PostFillHeight
              image={post.image}
              title={post.title}
              // [todo] parse as Date
              written={new Date(post.created)}
            />
          </AnchorNoStyle>
        </Link>
      ))}
    </Root>
  )
}

export default PostsBody
