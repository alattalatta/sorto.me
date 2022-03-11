import { style } from '@vanilla-extract/css'

export const root = style({
  maxWidth: `${768 / 16}rem`,
  margin: 'auto',
  padding: '1rem',
})

export const postWrap = style({
  color: 'inherit',
  display: 'block',
  textDecoration: 'none',
  selectors: {
    '& + &': {
      marginTop: '2rem',
    },
  },
})

export const fillHeight = style({
  height: '100%',
})
