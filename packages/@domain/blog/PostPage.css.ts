import { style } from '@vanilla-extract/css'

export const root = style({
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
  padding: '0 1rem',
})

export const body = style({
  marginTop: '1.5rem',
})

export const width768 = style({
  maxWidth: `${768 / 16}rem`,
})
