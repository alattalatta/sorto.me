import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const root = style({
  maxWidth: `${982 / 16}rem`,
  display: 'grid',
  gridTemplate: '3rem / 4rem repeat(3, 4rem) 1fr',
  alignItems: 'center',
  fontSize: `${14 / 16}rem`,
  margin: '0 auto',
  padding: '0 1rem',
  position: 'relative',
  zIndex: 1,
})

export const item = recipe({
  base: {
    fontWeight: 700,
    selectors: {
      '&:not(:first-of-type)': {
        textAlign: 'right',
      },
    },
  },
  variants: {
    current: {
      true: {
        opacity: 0.6,
      },
    },
  },
})

export const anchor = style({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
})

export const alignRight = style({
  marginLeft: 'auto',
})
