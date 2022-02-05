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
})

const Body = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  flexGrow: 1,
  position: 'relative',
  padding: `${120 / 16}rem 0 ${12 / 16}rem ${60 / 16}rem`,
})

const ImageBox = styled('div', {
  width: `${168 / 16}rem`,
  height: '100%',
  background: 'linear-gradient(359.41deg, #43E4DA 23.61%, #87F9A6 61.38%, #FCED70 100%)',
  boxSizing: 'border-box',
  padding: '.5rem .5rem 0 0',
  position: 'absolute',
  top: 0,
  left: 0,
})

const Image = styled('img', {
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover',
})

const Title = styled('h1', {
  fontSize: '1.5rem',
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

  return (
    <Root as={as} className={className}>
      <Body>
        <ImageBox>
          <Image alt="" src={image} />
        </ImageBox>
        <Title>{title}</Title>
      </Body>
      <Written dateTime={written.toISOString()}>
        {year}년 {month}월 {date}일 작성
      </Written>
    </Root>
  )
}

export { Post }
