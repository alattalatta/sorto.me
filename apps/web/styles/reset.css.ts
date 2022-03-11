import { vars } from '@lib/ui/theme.css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  boxSizing: 'border-box',
  textUnderlinePosition: 'under',
})

globalStyle('html', {
  color: vars.colors.fg0,
  fontFamily: vars.fonts.sans,
  scrollBehavior: 'smooth',
})

globalStyle('body', {
  background: vars.colors.bg0,
  fontSize: '100%',
  margin: 0,
  overflowX: 'hidden',
})
