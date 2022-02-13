import type { CSS } from '@stitches/react'
import { createStitches } from '@stitches/react'

const config = createStitches({
  media: {
    w1: `(min-width: ${412 / 16}rem)`,
    w2: `(min-width: ${769 / 16}rem)`,
  },
  theme: {
    colors: {
      fg: '#111',
      fgSuppl: '#1F2124',
      bg: '#fff',
      bgSuppl: '#F2F5F8',
      highlight: '#0CA79D',
    },
  },
})

export const { css, getCssText, styled } = config
export type StyleSheet = CSS<typeof config>
