import { keyframes, style } from '@vanilla-extract/css'

import { colors } from './theme.css'

export const trigger = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(0.25rem)' },
  '100%': { opacity: 1, transform: 'translateY(0.5rem)' },
})

export const body = style({
  animation: '400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
  background: colors.bg0,
  border: `1px solid ${colors.fg2}`,
  borderRadius: '0.5rem',
  color: colors.fg0,
  fontSize: `${14 / 16}rem`,
  padding: '1rem',
  transform: 'translateX(0)',
  selectors: {
    '&[data-state="open"]': {
      animationName: slideUpAndFade,
    },
  },
})
