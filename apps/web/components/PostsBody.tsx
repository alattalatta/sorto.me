import type { PostMetadata } from '@contents/posts'
import { Post, styled } from '@lib/ui'
import type { Variants } from 'framer-motion'
import { m } from 'framer-motion'
import Link from 'next/link'

type Props = {
  posts: readonly PostMetadata[]
}

const Root = styled(m.main, {
  maxWidth: `${768 / 16}rem`,
  margin: 'auto',
  padding: '1rem 0',
})

const rootVariants: Variants = {
  show: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.125,
    },
  },
}

const PostWrap = styled(m.a, {
  color: 'inherit',
  display: 'block',
  textDecoration: 'none',
  '& + &': {
    marginTop: '2rem',
  },
})

const postWrapVariants: Variants = {
  show: { opacity: 1 },
  hidden: { opacity: 0 },
}

const PostFillHeight = styled(Post, {
  height: '100%',
})

const PostsBody: React.VFC<Props> = ({ posts }) => {
  return (
    <Root animate="show" initial="hidden" variants={rootVariants}>
      {posts.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          <PostWrap href={`/posts/${post.slug}`} variants={postWrapVariants}>
            <PostFillHeight
              image={post.image}
              title={post.title}
              // [todo] parse as Date
              written={new Date(post.created)}
            />
          </PostWrap>
        </Link>
      ))}
    </Root>
  )
}

export default PostsBody
