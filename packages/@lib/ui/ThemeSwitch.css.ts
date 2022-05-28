import { style } from '@vanilla-extract/css'

import { colors } from './theme.css'

export const root = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1em',
  alignItems: 'center',
  padding: '0.5rem',
  whiteSpace: 'nowrap',
})

export const icon = style({
  width: `${15 / 14}em`,
  height: `${15 / 14}em`,
  fill: colors.fg0,
  marginLeft: '1ch',
})
