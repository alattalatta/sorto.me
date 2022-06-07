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

// both html and body's "overflow-x: hidden" are needed, as well as body's "position: relative"
// I have no idea but without one, absolute-positioned out-of-viewport (x-axis) elements cause viewport to grow

globalStyle('html', {
  color: colors.fg0,
  fontFamily: fonts.sans,
  overflowX: 'hidden',
  vars: {
    [icons.external]: 'url(/assets/external.svg)',
    [icons.fatal]: 'url(/assets/forbidden.png)',
    [icons.warn]: 'url(/assets/exclamation.png)',
  },
})

globalStyle('body', {
  minHeight: ['100vh', '100svh'],
  background: colors.bg0,
  fontSize: '100%',
  margin: 0,
  overflowX: 'hidden',
  position: 'relative',
})
