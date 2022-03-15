import { colors } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

export const root = style({
  cursor: 'help',
  padding: 2,
  ':hover': {
    background: colors.fg3,
  },
})

export const svg = style({
  width: 16,
  height: 16,
  fill: 'currentColor',
  verticalAlign: 'middle',
})
