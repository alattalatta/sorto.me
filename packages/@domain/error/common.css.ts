import { style } from '@vanilla-extract/css'

export const root = style({
  display: 'grid',
  gap: '2rem',
  gridTemplateColumns: '1fr 1fr',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const heading = style({
  fontSize: '3rem',
  fontWeight: 300,
  textAlign: 'right',
})

export const sub = style({
  height: '100%',
  display: 'flex',
  fontWeight: 700,
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 0,
})
