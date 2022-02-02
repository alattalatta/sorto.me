import { createStitches } from '@stitches/react'

export const { styled, css } = createStitches({
  media: {
    w1: `(min-width: ${412 / 16}rem)`,
    w2: `(min-width: ${769 / 16}rem)`,
  },
})
