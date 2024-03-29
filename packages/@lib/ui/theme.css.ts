import { createTheme } from '@vanilla-extract/css'

import { contract as colors } from './theme/colors.css'

const media = {
  /** 412 */
  w1: `(min-width: 25.75rem)`,
  /** 769 */
  w2: `(min-width: 48.0625rem)`,
  motionNoPref: '(prefers-reduced-motion: no-preference)',
  motionReduced: '(prefers-reduced-motion: reduce)',
} as const

const [fontsTheme, fonts] = createTheme({
  mono: `'Fira Code', 'Nanum Gothic Coding', '나눔고딕코딩', monospace`,
  sans: `Pretendard, sans-serif`,
  serif: `'Noto Serif KR', serif`,
})

const [timingsTheme, timings] = createTheme({
  linearlock: 'cubic-bezier(.6, .05, .35, 1)',
  swoosh: 'cubic-bezier(.16, 1, .3, 1)',
})

export { colors, fonts, fontsTheme, media, timings, timingsTheme }
