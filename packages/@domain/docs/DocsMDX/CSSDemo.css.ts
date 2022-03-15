import { vars as documentBodyVars } from '@lib/ui/documentBody.css'
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
  `,
  margin: '1.5rem 0',
  padding: '1em',
  '@media': {
    [media.w2]: {
      gridTemplateAreas: `
        'code result'
      `,
      gridTemplateColumns: `1fr ${400 / 16}rem`,
    },
  },
  vars: {
    [documentBodyVars.tagColor]: '#18c498',
    [documentBodyVars.stringLiteralColor]: '#257dff',
    [documentBodyVars.keywordColor]: '#ff7037',
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
  borderRadius: '0 0 .25rem .25rem',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '@media': {
    [media.w2]: {
      borderRadius: '.25rem 0 0 .25rem',
    },
  },
})

globalStyle(`${codes} pre`, {
  background: vars.colors.bgi1,
  color: vars.colors.fgi0,
  cursor: 'pointer',
  margin: 0,
  position: 'relative',
})
globalStyle(`${codes} pre + pre`, {
  marginTop: '0.25rem',
})
globalStyle(`${codes} pre::after`, {
  fontSize: '1.5em',
  position: 'absolute',
  top: '.25em',
  right: '.25em',
})
globalStyle(`${codes} pre.selected::after`, {
  content: '✔️',
})
