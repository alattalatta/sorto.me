import { keyframes, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

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

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const subtleExpansion = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const overlay = style({
  backgroundColor: colors.bg1,
  backdropFilter: 'blur(10px)',
  position: 'fixed',
  inset: 0,
  zIndex: 1,
  '@media': {
    [media.motionNoPref]: {
      animation: `200ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
      selectors: {
        '&[data-state="open"]': {
          animationName: fadeIn,
        },
        '&[data-state=closed]': {
          animationName: fadeOut,
        },
      },
    },
  },
})

export const body = style({
  width: '100%',
  maxWidth: '20rem',
  animation: `${fadeIn} 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  background: colors.bg0,
  border: `1px solid ${colors.fg2}`,
  borderRadius: '0.25rem',
  color: colors.fg0,
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  '@media': {
    [media.motionNoPref]: {
      animationDuration: '400ms',
      animationName: subtleExpansion,
    },
  },
})

export const title = style({
  borderBottom: `${1 / 16}rem solid ${colors.fg2}`,
  margin: 0,
  paddingBottom: '2rem',
})

export const itemWrap = style({
  marginTop: '2rem',
})

export const item = recipe({
  base: {
    color: 'inherit',
    fontWeight: 700,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  variants: {
    current: {
      true: {
        opacity: 0.6,
      },
    },
    home: {
      true: {
        fontSize: '2em',
      },
    },
  },
})

export const close = style({
  width: '3rem',
  height: '3rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  top: 0,
  right: 0,
})
