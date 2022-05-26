import { keyframes, style } from '@vanilla-extract/css'

import { FIXED_STRIP_HEIGHT } from '../fixedStrip.css'
import { colors } from '../theme.css'

export const body = style({
  maxWidth: `${982 / 16}rem`,
  margin: `1.5rem auto ${(FIXED_STRIP_HEIGHT + 24) / 16}rem`,
  paddingBottom: 'env(safe-area-inset-bottom)',
})

const marker = keyframes({
  '0%': {
    background: colors.warn,
  },
  '100%': {
    background: 'transparent',
  },
})

export const hashMatched = style({
  animation: `${marker} 1s ease`,
})
