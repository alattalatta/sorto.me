import { style } from '@vanilla-extract/css'

import { vars } from './theme.css'

export const root = style({
  width: '100%',
  height: `${40 / 16}rem`,
  border: `1px solid ${vars.colors.fg0}`,
  boxSizing: 'border-box',
  color: vars.colors.fg0,
  display: 'block',
  fontSize: '1em',
  padding: '0 1.5em',
})
