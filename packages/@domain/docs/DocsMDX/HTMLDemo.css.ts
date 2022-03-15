import { vars } from '@lib/ui/documentBody.css'
import { colors, media } from '@lib/ui/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const root = style({
  background: colors.bgi0,
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
    [vars.tagColor]: '#18c498',
    [vars.stringLiteralColor]: '#257dff',
    [vars.keywordColor]: '#ff7037',
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
  background: colors.bgi1,
  color: colors.fgi0,
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
  background: colors.bgi1,
  border: 'none',
  color: colors.fgi0,
  flexGrow: 1,
  fontSize: `${14 / 16}rem`,
})
