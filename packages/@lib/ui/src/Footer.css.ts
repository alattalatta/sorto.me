import { globalStyle, style } from '@vanilla-extract/css'

import { vars } from '../theme.css'

export const root = style({
  width: `${219 / 16}rem`,
  borderTop: `1px solid ${vars.colors.fg0}`,
  marginTop: '5rem',
  padding: '1.5rem 0 0.5rem',
})

export const updated = style({
  fontSize: `${14 / 16}rem`,
  margin: 0,
})

export const author = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  margin: 0,
})

export const legal = style({
  display: 'block',
  fontSize: `${10 / 16}rem`,
  fontStyle: 'italic',
})

export const license = style({
  fontWeight: 500,
  margin: 0,
})

export const mdn = style({
  margin: 0,
})

globalStyle(`${mdn} a`, {
  color: vars.colors.highlight,
  textDecoration: 'none',
})

globalStyle(`${mdn} a:hover`, {
  textDecoration: 'underline',
})
