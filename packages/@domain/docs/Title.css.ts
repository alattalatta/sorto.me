import { colors } from '@lib/ui/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const heading = style({
  fontSize: '2em',
  margin: 0,
})

export const breadcrumbs = style({
  fontSize: `${12 / 16}rem`,
  display: 'flex',
  marginTop: '.25em',
})

export const crumb = style({
  color: 'inherit',
})
globalStyle(`${crumb} + ${crumb}::before`, {
  content: '>',
  display: 'inline-block',
  margin: '0 0.5ch',
})

export const crumbAnchor = style({
  color: colors.highlight,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
})
