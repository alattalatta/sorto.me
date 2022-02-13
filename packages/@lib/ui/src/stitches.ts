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
      fgInv: '$bg',
      fgSupplInv: '$bgSuppl',
      bg: '#fff',
      bgSuppl: '#F2F5F8',
      bgInv: '$fg',
      bgSupplInv: '$fgSuppl',
      highlight: '#0CA79D',
    },
    fonts: {
      mono: `'Fira Code', 'Nanum Gothic Coding', '나눔고딕코딩', monospace`,
      sans: `Pretendard, sans-serif`,
      serif: `'Noto Serif KR', serif`,
    },
  },
})

export const { css, getCssText, styled } = config
export type StyleSheet = CSS<typeof config>