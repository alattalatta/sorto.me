import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { colors, media } from './theme.css'

export const root = style({
  background: colors.bg0,
  fontSize: `${14 / 16}rem`,
  lineHeight: '2.5rem',
  padding: '0.5rem 1rem 0.5rem 0.25rem',
  position: 'fixed',
  top: [0, 'env(safe-area-inset-top)'],
  right: 0,
  left: 0,
  zIndex: 9,
  '@media': {
    [media.w1]: {
      padding: '0.5rem 1rem',
    },
  },
})

export const filler = style({
  height: '3rem',
  paddingTop: [0, 'env(safe-area-inset-top)'],
})

export const container = style({
  maxWidth: `${982 / 16}rem`,
  display: 'grid',
  gridTemplate: '2.75rem / 2.75rem 1fr 2.75rem',
  alignItems: 'center',
  margin: '0 auto',
  '@media': {
    [media.w1]: {
      gridTemplate: '2.75rem / 6rem repeat(3, 4rem) 1fr',
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
