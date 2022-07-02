import { timings } from '@lib/ui/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

export const root = style({
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
  padding: '0 1rem',
})

const bodyIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(1rem)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const body = style({
  animation: `${bodyIn} 0.25s ${timings.linearlock} 0.25s forwards`,
  marginTop: '1.5rem',
  opacity: 0,
})

export const width768 = style({
  maxWidth: `${768 / 16}rem`,
})
