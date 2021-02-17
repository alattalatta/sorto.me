import { PostMetadata } from 'utils/posts'
import { styled } from 'utils/styler'

import Anchor from './basics/Anchor'

const Post = styled('article', {
  paddingTop: 24,
  paddingBottom: 24,
  position: 'relative',
  '&::before': {
    content: '""',
    background: '$base90',
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transform: 'scaleX(0.6)',
    transformOrigin: 'left center',
    transition: 'ease 300ms',
  },
  '&:hover::before': {
    opacity: 1,
    transform: 'none',
  },
  when: {
    tiny: {
      '&::before': {
        transform: 'scaleY(0.6)',
      },
    },
  },
})

const Wrap = styled(Anchor, {
  color: 'inherit',
  display: 'flex',
  position: 'relative',
  textDecoration: 'none',
  zIndex: 1,
  '&:hover': {
    color: 'inherit',
  },
  when: {
    medium: {
      display: 'block',
    },
  },
})

const Block = styled('div', {
  '&:not(:first-child)': {
    marginLeft: 64,
  },
  when: {
    medium: {
      '&:not(:first-child)': {
        marginTop: 16,
        marginLeft: 0,
      },
    },
  },
})

const TextBlock = styled(Block, {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
})

const Image = styled('img', {
  width: 450,
  display: 'block',
  when: {
    narrow: {
      width: '100%',
    },
  },
})

const Title = styled('h2', {
  fontSize: 36,
  fontWeight: 700,
})

const Excerpt = styled('p', {
  fontFamily: '"Nanum Gothic", sans-serif',
  marginTop: 12,
})

const Time = styled('time', {
  display: 'block',
  marginTop: 16,
})

export type PostDatum = {
  meta: PostMetadata
  slug: string
}

const BlogPostEntry: React.VFC<{ post: PostDatum }> = ({ post }) => {
  return (
    <Post aria-labelledby={post.slug}>
      <Wrap href={`/posts/${post.slug}`}>
        <Block>
          <Image src={post.meta.image} alt="" width="450" />
        </Block>
        <TextBlock>
          <Title id={post.slug}>{post.meta.title}</Title>
          {post.meta.excerpt && <Excerpt>{post.meta.excerpt}</Excerpt>}
          <Time dateTime={post.meta.created}>{post.meta.created}</Time>
        </TextBlock>
      </Wrap>
    </Post>
  )
}

export default BlogPostEntry
