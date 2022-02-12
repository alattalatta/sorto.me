import { styled } from './stitches'

type Props = {
  breadcrumbs: readonly (readonly [title: string, path: string])[]
  title: string
}

const Heading = styled('h1', {
  fontSize: '2em',
  margin: 0,
})

const Breadcrumbs = styled('nav', {
  fontSize: `${12 / 16}em`,
  display: 'flex',
  marginTop: '.25em',
})

const Crumb = styled('span', {
  color: '#2c2c2c',
  '& + &::before': {
    content: '>',
    display: 'inline-block',
    margin: '0 0.5ch',
  },

  '& a': {
    color: '#0CA79D',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

const Title: React.VFC<Props> = ({ breadcrumbs, title }) => {
  return (
    <div>
      <Heading>{title}</Heading>
      <Breadcrumbs>
        {breadcrumbs.map(([currentTitle, currentPath]) => {
          return (
            <Crumb key={currentPath}>
              <a href={`/docs${currentPath}`}>{currentTitle}</a>
            </Crumb>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}

export { Title }
