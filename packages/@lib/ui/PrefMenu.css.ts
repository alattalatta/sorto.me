import { keyframes, style } from '@vanilla-extract/css'

import { colors, media } from './theme.css'

export const trigger = style({
  width: '2.5rem',
  height: '2.5rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'bottom',
})

const fade = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(0.25rem)' },
  '100%': { opacity: 1, transform: 'translateY(0.5rem)' },
})

export const body = style({
  background: colors.bg0,
  border: `1px solid ${colors.fg2}`,
  borderRadius: '0.25rem',
  color: colors.fg0,
  fontSize: `${14 / 16}rem`,
  padding: '0.5rem',
  selectors: {
    '&[data-state="open"]': {
      '@media': {
        [media.motionNoPref]: {
          animation: `${slideUpAndFade} 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        },
        [media.motionReduced]: {
          animation: `${fade} 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        },
      },
    },
  },
})
