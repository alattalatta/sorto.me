import { recipe } from '@vanilla-extract/recipes'

import { vars } from './theme.css'

export const FIXED_STRIP_HEIGHT = 40

export const root = recipe({
  base: {
    width: '100%',
    maxWidth: `${982 / 16}rem`,
    height: `${FIXED_STRIP_HEIGHT / 16}rem`,
    background: vars.colors.bgi0,
    boxSizing: 'content-box',
    color: vars.colors.fgi0,
    margin: '0 auto',
    padding: 0,
    position: 'fixed',
    right: 0,
    left: 0,
    transition: 'transform 250ms ease',
    zIndex: 5,
  },
  variants: {
    position: {
      top: {
        paddingTop: 'env(safe-area-inset-top)',
        top: 0,
      },
      bottom: {
        paddingBottom: 'env(safe-area-inset-bottom)',
        bottom: 0,
      },
    },
  },
})
