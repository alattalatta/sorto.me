import { fonts, colors } from '@lib/ui/theme.css'
import { icons } from '@lib/ui/vars.css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  boxSizing: 'border-box',
  textUnderlinePosition: 'under',
})

globalStyle('*:focus-visible', {
  borderRadius: '0.5rem',
  outline: `${2 / 16}rem solid ${colors.fg1}`,
  outlineOffset: `${2 / 16}rem`,
})

globalStyle('html', {
  color: colors.fg0,
  fontFamily: fonts.sans,
  vars: {
    [icons.external]: 'url(/assets/external.svg)',
    [icons.fatal]: 'url(/assets/forbidden.png)',
    [icons.warn]: 'url(/assets/exclamation.png)',
  },
})

globalStyle('body', {
  background: colors.bg0,
  fontSize: '100%',
  margin: 0,
  overflowX: 'hidden',
})
