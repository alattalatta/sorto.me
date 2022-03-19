import { style } from '@vanilla-extract/css'

export * from './common.css'

export const anchor = style({
  width: 'fit-content',
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },

  selectors: {
    '& + &': {
      marginTop: '2rem',
    },
  },
})
