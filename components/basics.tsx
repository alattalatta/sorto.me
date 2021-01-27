import { styled } from 'utils/styler'

export const Anchor = styled('a', {
  '&:active': {
    backgroundColor: '#0ff',
    color: '#fff',
  },
  '&:hover': {
    color: '#f00',
  },
  color: '#0b0d0e',
})
