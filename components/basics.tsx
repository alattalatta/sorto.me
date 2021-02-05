import { styled } from 'utils/styler'

const CONTAINER_WIDTH = 1240
const CONTAINER_PADDING = 40

export const Anchor = styled('a', {
  color: '#0C2640', // [todo] move to theme
  display: 'inline-block',
  position: 'relative',
  '&::before': {
    content: "''",
    position: 'absolute',
    top: -4,
    right: -2,
    bottom: -4,
    left: -2,
    zIndex: -1,
  },
  '&:hover::before': {
    backgroundColor: '#6FDBFC',
  },
  '&:active': {
    color: '#fff',
    '&::before': {
      backgroundColor: '#FF5252',
    },
  },
})

export const Container = styled('div', {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: CONTAINER_WIDTH,
  paddingLeft: CONTAINER_PADDING,
  paddingRight: CONTAINER_PADDING,
  width: '100%',
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
