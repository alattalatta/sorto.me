import { styled } from 'utils/styler'

import { CONTAINER_PADDING } from './Container'

const HeroContainer = styled('div', {
  alignItems: 'center',
  background: 'black',
  color: 'white',
  display: 'flex',
  fontFamily: 'sans-serif',
  justifyContent: 'center',
  marginBottom: 40,
  marginLeft: -CONTAINER_PADDING,
  marginRight: -CONTAINER_PADDING,
})

const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: 400,
  margin: 0,
  padding: '88px 0',
})

const PostHero: React.VFC<{ children: string }> = ({ children }) => {
  return (
    <HeroContainer>
      <Title>{children}</Title>
    </HeroContainer>
  )
}

export default PostHero
