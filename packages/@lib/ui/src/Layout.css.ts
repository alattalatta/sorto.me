import { style } from '@vanilla-extract/css'

import { FIXED_STRIP_HEIGHT } from '../fixedStrip.css'

export const body = style({
  maxWidth: `${982 / 16}rem`,
  margin: `1.5rem auto ${FIXED_STRIP_HEIGHT / 16}rem`,
  paddingBottom: 'env(safe-area-inset-bottom)',
})
