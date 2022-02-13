import { styled } from './stitches'

const Input = styled('input', {
  width: '100%',
  height: `${40 / 16}rem`,
  border: '1px solid $fg',
  boxSizing: 'border-box',
  color: '$fg',
  display: 'block',
  fontSize: '1em',
  padding: '0 1.5em',
})

export { Input }
