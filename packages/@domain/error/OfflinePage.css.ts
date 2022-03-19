import { style } from '@vanilla-extract/css'

export * from './common.css'

export const goBack = style({
  width: 'fit-content',
  appearance: 'none',
  background: 'none',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  fontWeight: 700,
  marginTop: '1.5rem',
  padding: 0,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
})
