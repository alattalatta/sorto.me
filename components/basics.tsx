import { styled } from 'utils/styler'

export const Anchor = styled('a', {
  color: '#0b0d0e', // [todo] move to theme
  display: 'inline-block',
  '&:hover': {
    color: '#f00',
  },
  '&:active': {
    backgroundColor: '#0ff',
    color: '#fff',
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
