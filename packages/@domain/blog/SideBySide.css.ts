import { media, vars } from '@lib/ui/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const root = style({
  width: '100vw',
  padding: '1rem',
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
})

export const wrap = style({
  display: 'grid',
  gap: '1rem',
  '@media': {
    [media.w2]: {
      justifyContent: 'center',
      gap: '2rem',
      gridAutoColumns: `minmax(${368 / 16}rem, ${512 / 16}rem)`,
      gridAutoFlow: 'column',
    },
  },
})

globalStyle(`${wrap} > *`, {
  width: '100%',
  maxWidth: '100%',
  margin: 0,
})

globalStyle(`${wrap} > :first-child`, {
  justifySelf: 'flex-end',
})

globalStyle(`${wrap} > :last-child`, {
  justifySelf: 'flex-start',
})

export const caption = style({
  color: vars.colors.mid,
  fontSize: `${14 / 16}rem`,
  marginTop: '.5rem',
  textAlign: 'center',
})
