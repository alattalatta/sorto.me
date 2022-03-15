import { fonts, colors } from '@lib/ui/theme.css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  boxSizing: 'border-box',
  textUnderlinePosition: 'under',
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
