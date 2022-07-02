import { keyframes, style } from '@vanilla-extract/css'

import { colors, media, timings } from './theme.css'

export const trigger = style({
  width: '2.75rem',
  height: '2.75rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'bottom',
})

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const subtleSlideUp = keyframes({
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
  zIndex: 99,
  selectors: {
    '&[data-state="open"]': {
      animation: `${fadeIn} 200ms ${timings.swoosh} forwards`,
      '@media': {
        [media.motionNoPref]: {
          animation: `${subtleSlideUp} 400ms ${timings.swoosh} forwards`,
        },
      },
    },
  },
})

export const themeButton = style({
  width: '100%',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1em',
  alignItems: 'center',
  padding: '0.5rem',
  whiteSpace: 'nowrap',
  ':hover': {
    textDecoration: 'underline',
  },
})

export const themeIcon = style({
  width: `${15 / 14}em`,
  height: `${15 / 14}em`,
  fill: colors.fg0,
  marginRight: '1ch',
})
