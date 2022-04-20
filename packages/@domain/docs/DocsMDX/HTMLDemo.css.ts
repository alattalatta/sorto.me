import { colors, media } from '@lib/ui/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const root = style({
  background: colors.bg1,
  borderRadius: '.25rem',
  display: 'grid',
  gap: '1rem',
  gridTemplateAreas: `
    'result'
    'code'
    'languages'
  `,
  gridTemplateRows: `auto 1fr ${44 / 16}rem`,
  margin: '1.5rem 0',
  padding: '1rem',
  '@media': {
    [media.w2]: {
      maxHeight: '20rem',
      gap: '.25rem',
      gridTemplateAreas: `
        'languages result'
        'code      result'
      `,
      gridTemplateColumns: `1fr ${400 / 16}rem`,
      gridTemplateRows: `${44 / 16}rem 1fr`,
    },
  },
})

export const result = style({
  height: '100%',
  borderRadius: '.25rem .25rem 0 0',
  gridArea: 'result',
  '@media': {
    [media.w2]: {
      maxHeight: 'none',
      borderRadius: '0 .25rem .25rem 0',
    },
  },
})

export const codes = style({
  maxHeight: `${256 / 16}rem`,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gridArea: 'code',
  overflow: 'auto',
  '@media': {
    [media.w2]: {
      maxHeight: 'none',
      borderRadius: '0 .25rem .25rem 0',
    },
  },
})

globalStyle(`${codes} pre`, {
  minHeight: '100%',
  background: colors.bg0,
  color: colors.fg0,
  margin: 0,
})

export const langButtonsBar = style({
  display: 'flex',
  borderRadius: '0 0 .25rem .25rem',
  gap: '.25rem',
  gridArea: 'languages',
  overflow: 'hidden',
})

export const langButton = style({
  height: `${44 / 16}rem`,
  background: colors.bg0,
  border: 'none',
  color: colors.fg0,
  cursor: 'pointer',
  flexGrow: 1,
  fontSize: `${14 / 16}rem`,
  ':hover': {
    background: colors.notebg,
  },
})
