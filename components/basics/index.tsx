import { styled } from 'utils/styler'

export { default as Anchor } from './Anchor'

export const Container = styled('div', {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: 1280,
  paddingLeft: 40,
  paddingRight: 40,
  width: '100%',
  '@narrow': {
    maxWidth: 680,
  },
  '@tiny': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  variants: {
    position: {
      relative: {
        position: 'relative',
      },
    },
  },
})

export const NoScreen = styled('span', {
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: 1,
  margin: 0,
  padding: 0,
  position: 'absolute',
  width: 1,
  zIndex: -9,
})

export const Break: React.VFC<JSX.IntrinsicElements['br']> = (props) => <br aria-hidden="true" {...props} />
