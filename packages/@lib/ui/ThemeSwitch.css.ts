import { createVar, style } from '@vanilla-extract/css'

import { colors, media } from './theme.css'

export const vars = {
  switchPos: createVar(),
}

export const root = style({
  display: 'flex',
})

export const icon = style({
  width: '1rem',
  height: '1rem',
  fill: colors.fg0,
})

export const checkbox = style({})

export const switchi = style({
  width: '2rem',
  minWidth: '2rem',
  height: '1rem',
  background: colors.bgi0,
  borderRadius: '0.5rem',
  cursor: 'pointer',
  display: 'block',
  margin: '0 .25rem',
  position: 'relative',
  '::after': {
    content: '',
    width: `${12 / 16}rem`,
    height: `${12 / 16}rem`,
    background: colors.fgi1,
    borderRadius: '50%',
    display: 'block',
    position: 'absolute',
    top: `${2 / 16}rem`,
    left: `${2 / 16}rem`,
  },
  selectors: {
    [':focus + &']: {
      outline: `${2 / 16}rem solid ${colors.fg0}`,
      outlineOffset: `${2 / 16}rem`,
    },
    [`${checkbox}:checked + &::after`]: {
      left: 'auto',
      right: `${2 / 16}rem`,
    },
    [`${checkbox}:indeterminate + &::after`]: {
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
})
