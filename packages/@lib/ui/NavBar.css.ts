import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { media } from './theme.css'

export const root = style({
  maxWidth: `${982 / 16}rem`,
  display: 'grid',
  gridTemplate: '2.5rem / 2.5rem 1fr 2.5rem',
  alignItems: 'center',
  fontSize: `${14 / 16}rem`,
  lineHeight: '2.5rem',
  margin: '0 auto',
  padding: '0.5rem 1rem 0 0.25rem',
  position: 'relative',
  zIndex: 1,
  '@media': {
    [media.w1]: {
      gridTemplate: '2.5rem / 6rem repeat(3, 4rem) 1fr',
      padding: '0.5rem 1rem 0',
    },
  },
})

export const mobileMenu = style({
  '@media': {
    [media.w1]: {
      display: 'none',
    },
  },
})

export const item = recipe({
  base: {
    display: 'none',
    fontWeight: 700,
    '@media': {
      [media.w1]: {
        display: 'inline',
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
