import { colors } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

export const root = style({
  background: colors.bg1,
  borderRadius: '0.25rem',
  padding: '0.5rem',
})

export const wrap = style({
  borderRadius: '0.25rem',
  boxSizing: 'content-box',
  overflow: 'hidden',
  position: 'relative',
})
