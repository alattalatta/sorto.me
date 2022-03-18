import { style } from '@vanilla-extract/css'

const THETA = 28.85
const HEIGHT = 427
const OFFSET_TOP = 338
const OFFSET_LEFT = 50

export const stripRoot = style({
  overflow: 'hidden',
  position: 'fixed',
  inset: 0,
})

export const stripWrap = style({
  height: '100%',
  position: 'relative',
})

export const strip = style({
  height: HEIGHT,
  position: 'absolute',
  top: -OFFSET_TOP,
  left: -OFFSET_LEFT,
  transform: `rotate(${THETA}deg)`,
  transformOrigin: 'bottom left',
  transition: 'width 300ms ease-out',
})

export const contentsRoot = style({
  fontSize: 36,
  marginLeft: 'min(99px, 10vw)',
  position: 'absolute',
  top: 380,
  transform: 'rotate(-15deg)',
  transformOrigin: 'top left',
  zIndex: 1,
})
