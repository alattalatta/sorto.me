import { styled } from 'utils/styler'

export const Anchor = styled('a', {
  color: '#0b0d0e',
  display: 'inline-block',
  '&:hover': {
    color: '#f00',
  },
  '&:active': {
    backgroundColor: '#0ff',
    color: '#fff',
  },
})
