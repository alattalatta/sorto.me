import { styled } from './stitches'

const HEIGHT = 40 / 16

const FixedStrip = styled('div', {
  width: '100%',
  maxWidth: `${982 / 16}rem`,
  height: `${HEIGHT}rem`,
  background: '$fg',
  color: '$bg',
  margin: '0 auto',
  padding: 0,
  position: 'fixed',
  right: 0,
  left: 0,
  transition: 'transform 250ms ease',
  zIndex: 5,
  variants: {
    position: {
      top: {
        paddingTop: 'env(safe-area-inset-top)',
        top: 0,
      },
      bottom: {
        paddingBottom: 'env(safe-area-inset-bottom)',
        bottom: 0,
      },
    },
  },
})

export { HEIGHT, FixedStrip }
