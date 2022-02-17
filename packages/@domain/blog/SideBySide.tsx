import { styled } from '@lib/ui'

type Props = {
  caption?: string
}

const Root = styled('figure', {
  width: '100vw',
  padding: '1rem',
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
})

const Caption = styled('figcaption', {
  color: '#999',
  fontSize: `${14 / 16}rem`,
  marginTop: '.5rem',
  textAlign: 'center',
})

const Wrap = styled('div', {
  display: 'grid',
  gap: '1rem',

  '& > *': {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
  },

  '@w2': {
    justifyContent: 'center',
    gap: '2rem',
    gridAutoColumns: `minmax(${368 / 16}rem, ${512 / 16}rem)`,
    gridAutoFlow: 'column',

    '& > :first-child': {
      justifySelf: 'flex-end',
    },
    '& > :last-child': {
      justifySelf: 'flex-start',
    },
  },
})

const SideBySide: React.FC<Props> = ({ caption, children }) => {
  return (
    <Root>
      <Wrap>{children}</Wrap>
      {caption && <Caption>{caption}</Caption>}
    </Root>
  )
}

export { SideBySide }
