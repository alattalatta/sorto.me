import React from 'react'

import { PostMetadata } from 'utils/posts'
import { styled } from 'utils/styler'

import { Container as ContainerBase } from './basics'

const HeroContainer = styled('header', {
  background: '$base10',
  color: '$base100',
  marginBottom: 36,
  paddingTop: 36,
  paddingBottom: 52,
  textAlign: 'right',
  '@tiny': {
    paddingTop: 0,
  },
})

const Container = styled(ContainerBase, {
  display: 'flex',
  '@narrow': {
    display: 'block',
  },
})

const Block = styled('div', {
  width: '50%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  flexDirection: 'column',
  '@narrow': {
    width: '100%',
    '&:not(:first-child)': {
      marginTop: 24,
    },
  },
})

const Image = styled('img', {
  width: '100%',
  display: 'block',
})

const Title = styled('h1', {
  color: '$base70',
  fontSize: 36,
  lineHeight: 1.3,
  wordBreak: 'keep-all',
})

const Created = styled('time', {
  color: '$base90',
  display: 'block',
  fontSize: 16,
  marginTop: 16,
})

type Props = {
  meta: PostMetadata
}

const BlogHero: React.VFC<Props> = ({ meta }) => {
  const { created, title } = meta

  return (
    <HeroContainer>
      <Container>
        <Block>{meta.image && <Image src={meta.image} alt="" />}</Block>
        <Block>
          <Title>{title}</Title>
          <Created>{created}</Created>
        </Block>
      </Container>
    </HeroContainer>
  )
}

export default BlogHero
