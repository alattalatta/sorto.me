import { styled } from '@lib/ui'

type Props = {
  breadcrumbs: readonly (readonly [title: string, path: string])[]
  title: string
}

const Heading = styled('h1', {
  fontSize: '2em',
  margin: 0,
})

const Breadcrumbs = styled('nav', {
  fontSize: `${12 / 16}rem`,
  display: 'flex',
  marginTop: '.25em',
})

const Crumb = styled('span', {
  color: '$fg',
  '& + &::before': {
    content: '>',
    display: 'inline-block',
    margin: '0 0.5ch',
  },

  '& a': {
    color: '$highlight',
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
