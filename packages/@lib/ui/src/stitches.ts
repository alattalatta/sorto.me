import type { CSS } from '@stitches/react'
import { createStitches } from '@stitches/react'

const config = createStitches({
  media: {
    w1: `(min-width: ${412 / 16}rem)`,
    w2: `(min-width: ${769 / 16}rem)`,
  },
})

export const { css, getCssText, styled } = config
export type StyleSheet = CSS<typeof config>
