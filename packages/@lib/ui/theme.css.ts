import { createTheme } from '@vanilla-extract/css'

import { contract } from './theme/contract.css'

const media = {
  w1: `(min-width: 25.75rem)`, // 412
  w2: `(min-width: 48.0625rem)`, // 769
} as const

const [fontsTheme, fonts] = createTheme({
  mono: `'Fira Code', 'Nanum Gothic Coding', '나눔고딕코딩', monospace`,
  sans: `Pretendard, sans-serif`,
  serif: `'Noto Serif KR', serif`,
})

export { contract as colors, fonts, fontsTheme, media }
