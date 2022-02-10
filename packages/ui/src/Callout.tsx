import exclamation from './assets/exclamation.png'
import forbidden from './assets/forbidden.png'
import { styled } from './stitches'

type Props = {
  type: 'note' | 'warning' | 'alert'
}

const Root = styled('figure', {
  borderLeft: '0.5rem solid',
  margin: 0,
  paddingLeft: '1rem',

  variants: {
    type: {
      note: {
        borderLeftColor: '#43E4DA',
      },
      warning: {
        borderLeftColor: '#FFE400',
      },
      alert: {
        borderLeftColor: '#FF5858',
      },
    },
  },
})

const Caption = styled('figcaption', {
  fontSize: `${14 / 16}rem`,
})

const Icon = styled('img', {
  imageRendering: 'pixelated',
  marginLeft: '0.25rem',
  verticalAlign: 'bottom',
})

const Body = styled('div', {
  marginTop: '0.25rem',
})

const Callout: React.FC<Props> = ({ children, type }) => {
  const [caption, icon] = (() => {
    switch (type) {
      case 'note':
        return ['참고', null]
      case 'warning':
        return ['주의', exclamation]
      case 'alert':
        return ['경고', forbidden]
    }
  })()

  return (
    <Root type={type}>
      <Caption>
        {caption}
        {icon && <Icon alt="" src={icon.src} />}
      </Caption>
      <Body>{children}</Body>
    </Root>
  )
}

export { Callout }
