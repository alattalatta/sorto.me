import { style } from '@vanilla-extract/css'

export { root } from '../fixedStrip.css'

export const button = style({
  width: '100%',
  height: '100%',
  background: 'none',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: `${14 / 16}rem`,
  margin: 0,
  padding: 0,
})

export const arrow = style({
  width: `${10 / 16}rem`,
  height: `${10 / 16}rem`,
  fill: 'currentcolor',
  marginRight: '.25rem',
})
