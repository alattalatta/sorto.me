import { colors } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

export const root = style({
  width: `${136 / 16}rem`,
  border: `${1 / 16}rem solid ${colors.bg2}`,
  color: colors.fg2,
  marginTop: '0.5rem',
  padding: `0 ${12 / 16}rem 1rem`,
  position: 'sticky',
  top: '3rem',
})

export const heading = style({
  background: colors.bg0,
  fontSize: `${12 / 16}rem`,
  margin: 0,
  padding: '0 0.25rem',
  position: 'absolute',
  top: '-0.5rem',
  left: '0.5rem',
})

export const docTitle = style({
  background: colors.notebg,
  fontSize: `${12 / 16}rem`,
  fontStyle: 'normal',
  fontWeight: 700,
  margin: `0 -${12 / 16}rem`,
  padding: `${12 / 16}rem`,
})

export const list = style({
  fontSize: `${14 / 16}rem`,
  listStyle: 'none',
  margin: 0,
  padding: 0,
  wordBreak: 'keep-all',
})

export const item = style({
  marginTop: '1em',
})

export const anchor = style({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
})
