import { colors } from '@lib/ui/theme.css'
import { keyframes, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const root = style({
  display: 'flex',
  position: 'relative',
})

export const frame = recipe({
  base: { width: '100%', background: 'none', border: 'none', display: 'block', transition: 'opacity 0.25s ease-out' },
  variants: {
    loading: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
  },
})

export const loadingMessage = recipe({
  base: {
    color: colors.fg1,
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    margin: 0,
    paddingLeft: '0.25rem',
    position: 'absolute',
    right: '0.5rem',
    bottom: '0.5rem',
    transition: 'opacity 0.25s ease-out',
  },
  variants: {
    loading: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
})

const spin = keyframes({
  '0%': {
    transform: 'rotateY(0deg) rotateZ(45deg)',
  },
  '100%': {
    transform: 'rotateY(360deg) rotateZ(45deg)',
  },
})

export const spinner = style({
  width: '0.75rem',
  height: '0.75rem',
  animation: `${spin} 1s linear infinite`,
  border: `1px solid ${colors.fg1}`,
  marginRight: '0.5rem',
})
