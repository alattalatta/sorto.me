import { style } from '@vanilla-extract/css'

import { colors } from './theme.css'

export const root = style({
  width: '100%',
  height: `${40 / 16}rem`,
  border: `1px solid ${colors.fg0}`,
  boxSizing: 'border-box',
  color: colors.fg0,
  display: 'block',
  fontSize: '1em',
  padding: '0 1.5em',
})
