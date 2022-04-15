import { colors } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

export const root = style({
  minHeight: '100vh',
  background: colors.bg0,
  color: colors.fg0,
  overflowX: 'auto',
  padding: '0.5rem',
})
