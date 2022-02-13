import { m } from 'framer-motion'

import { styled } from './stitches'

type Props = {
  as?: 'article' | 'header'
  className?: string
  image: string
  title: string
  written: Date
}

const Root = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 1,
})

const Body = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  flexGrow: 1,
  position: 'relative',
  padding: `${110 / 16}rem 0 ${22 / 16}rem ${60 / 16}rem`,
})

const ImageBox = styled('div', {
  width: `${168 / 16}rem`,
  height: '100%',
  background: '#ccc center / cover',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
  '&::before': {
    content: '',
    background: 'linear-gradient(359.41deg, #43E4DA 23.61%, #87F9A6 61.38%, #FCED70 100%)',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(100% - 0.5rem) 100%, calc(100% - 0.5rem) 0.5rem, 0 0.5rem, 0 0)',
    display: 'block',
    position: 'absolute',
    inset: '-.5rem -.5rem .5rem .5rem',
  },
})

const Title = styled('h1', {
  fontSize: '1.5rem',
  fontWeight: 400,
  background: '#fff',
  margin: 0,
  padding: '.25rem .5rem',
  position: 'relative',
  wordBreak: 'keep-all',
  zIndex: 1,
})

const Written = styled('time', {
  display: 'block',
  fontSize: `${12 / 16}rem`,
  marginTop: '.5rem',
})

const Post: React.VFC<Props> = ({ as = 'article', className, image, title, written }) => {
  const year = written.getFullYear()
  const month = written.getMonth() + 1
  const date = written.getDate()

  const rootElem = as === 'article' ? m.article : m.header

  return (
    <Root as={rootElem} className={className} layoutId={title}>
      <Body>
        <ImageBox css={{ backgroundImage: `url(${image})` }} />
        <Title>{title}</Title>
      </Body>
      <Written dateTime={written.toISOString()}>
        {year}년 {month}월 {date}일 작성
      </Written>
    </Root>
  )
}

export { Post }
