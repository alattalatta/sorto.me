import { keywordColor, stringLiteralColor, tagColor } from '@lib/ui/documentBody.css'
import { media, vars } from '@lib/ui/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const root = style({
  background: vars.colors.bgi0,
  borderRadius: '.25rem',
  display: 'grid',
  gap: '.25rem',
  gridTemplateAreas: `
    'result'
    'code'
    'languages'
  `,
  margin: '1.5rem 0',
  padding: '1rem',
  '@media': {
    [media.w2]: {
      gridTemplateAreas: `
        'languages result'
        'code      result'
      `,
      gridTemplateColumns: `1fr ${400 / 16}rem`,
      gridTemplateRows: `${44 / 16}rem 1fr`,
    },
  },
  vars: {
    [keywordColor]: '#18c498',
    [stringLiteralColor]: '#257dff',
    [tagColor]: '#ff7037',
  },
})

export const result = style({
  height: '100%',
  borderRadius: '.25rem .25rem 0 0',
  gridArea: 'result',
  '@media': {
    [media.w2]: {
      borderRadius: '0 .25rem .25rem 0',
    },
  },
})

export const codes = style({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gridArea: 'code',
})

globalStyle(`${codes} pre`, {
  background: vars.colors.bgi1,
  color: vars.colors.fgi0,
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
  background: vars.colors.bgi1,
  border: 'none',
  color: vars.colors.fgi0,
  flexGrow: 1,
  fontSize: `${14 / 16}rem`,
})
