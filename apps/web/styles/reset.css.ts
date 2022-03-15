import { fonts, colors } from '@lib/ui/theme.css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  boxSizing: 'border-box',
  textUnderlinePosition: 'under',
})

globalStyle('*:focus', {
  borderRadius: '0.5rem',
  outline: `${2 / 16}rem solid ${colors.fg0}`,
  outlineOffset: `${2 / 16}rem`,
})

globalStyle('html', {
  color: colors.fg0,
  fontFamily: fonts.sans,
})

globalStyle('body', {
  background: colors.bg0,
  fontSize: '100%',
  margin: 0,
  overflowX: 'hidden',
})
