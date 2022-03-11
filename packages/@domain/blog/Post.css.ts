import { vars } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 1,
})

export const body = style({
  display: 'flex',
  alignItems: 'flex-end',
  flexGrow: 1,
  position: 'relative',
  padding: `${110 / 16}rem 0 ${22 / 16}rem ${60 / 16}rem`,
})

export const imageBox = style({
  width: `${168 / 16}rem`,
  height: '100%',
  background: '#ccc center / cover',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
  '::before': {
    content: '',
    background: 'linear-gradient(359.41deg, #43E4DA 23.61%, #87F9A6 61.38%, #FCED70 100%)',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(100% - 0.5rem) 100%, calc(100% - 0.5rem) 0.5rem, 0 0.5rem, 0 0)',
    display: 'block',
    position: 'absolute',
    inset: '-.5rem -.5rem .5rem .5rem',
  },
})

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 400,
  background: vars.colors.bg0,
  margin: 0,
  padding: '.25rem .5rem',
  position: 'relative',
  wordBreak: 'keep-all',
  zIndex: 1,
})

export const written = style({
  display: 'block',
  fontSize: `${12 / 16}rem`,
  marginTop: '.5rem',
})
