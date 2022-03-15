import { colors } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

export const root = style({
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
  padding: '1.5rem 1rem 1rem',
})

export const searchBox = style({
  display: 'flex',
  alignItems: 'center',
})

export const emptyQueryBody = style({
  maxWidth: `${768 / 16}rem`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: 'auto',
  padding: '1rem',
  position: 'fixed',
  inset: 0,
})

export const submitButton = style({
  width: `${96 / 16}rem`,
  height: `${40 / 16}rem`,
  background: colors.fg0,
  border: 'none',
  color: colors.bg0,
  fontSize: '1em',
  padding: 0,
})
