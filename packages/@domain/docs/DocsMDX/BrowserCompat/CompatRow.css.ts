import { colors } from '@lib/ui/theme.css'
import { style } from '@vanilla-extract/css'

export const root = style({
  selectors: {
    '& + &': {
      marginTop: '1rem',
    },
    '& &': {
      paddingLeft: '1rem',
    },
  },
})

export const summary = style({
  cursor: 'pointer',
  userSelect: 'none',
})

export const body = style({
  marginLeft: `${4 / 16}rem`,
  selectors: {
    // when children (recursive=true) body
    'details > &': {
      borderLeft: `2px solid ${colors.fg0}`,
      paddingLeft: '0.75rem',
    },
  },
})

export const tableContainer = style({
  display: 'flex',
  overflowX: 'auto',
  marginBottom: '0.5rem',
  '::-webkit-scrollbar': {
    background: colors.fg3,
    height: 4,
  },
  '::-webkit-scrollbar-thumb': {
    background: colors.fg0,
  },
})

export const table = style({
  border: 'none',
  borderCollapse: 'collapse',
  marginBottom: `${12 / 16}rem`,
  selectors: {
    '& + &': {
      marginLeft: '1rem',
    },
  },
})

export const browserName = style({
  width: `${80 / 16}rem`,
  minWidth: `${80 / 16}rem`,
  height: `${54 / 16}rem`,
  border: 'none',
  fontSize: `${14 / 16}rem`,
  fontWeight: 400,
  padding: `0 0 ${10 / 16}rem`,
  verticalAlign: 'bottom',
  whiteSpace: 'pre-wrap',
})

export const childrenWrap = style({
  marginTop: '1rem',
})
