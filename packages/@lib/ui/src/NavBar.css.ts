import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const root = style({
  maxWidth: `${982 / 16}rem`,
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  fontSize: `${14 / 16}rem`,
  margin: '0 auto',
  padding: '0 1rem',
  position: 'relative',
  zIndex: 1,
})

export const item = recipe({
  base: {
    color: 'inherit',
    fontWeight: 700,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    selectors: {
      '& + &': {
        marginLeft: '2rem',
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
