import { style } from '@vanilla-extract/css'

export const label = style({
  fontSize: '1em',
  margin: 0,
})

export const item = style({
  selectors: {
    '* + &': {
      marginTop: `${10 / 16}rem`,
    },
  },
})

export const anchor = style({
  color: 'inherit',
  textDecoration: 'none',
})
