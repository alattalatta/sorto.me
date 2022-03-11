import { createTheme } from '@vanilla-extract/css'

const palette = {
  gray0: '#FBFCFD',
  gray1: '#EDF0F2',
  gray2: '#D7DCDF',
  gray3: '#C1C8CD',
  gray4: '#889096',
  gray5: '#2F3235',
  gray6: '#11181C',
  highlight: '#0CA79D',
} as const

const media = {
  w1: `(min-width: 25.75rem)`, // 412
  w2: `(min-width: 48.0625rem)`, // 769
} as const

const [theme, vars] = createTheme({
  colors: {
    ...palette,
    fg0: palette.gray6,
    fg1: palette.gray5,
    fg2: palette.gray4,
    mid: palette.gray3,
    bg2: palette.gray2,
    bg1: palette.gray1,
    bg0: palette.gray0,

    fgi0: palette.gray0,
    fgi1: palette.gray1,
    fgi2: palette.gray2,
    bgi2: palette.gray3,
    bgi1: palette.gray4,
    bgi0: palette.gray5,
  },
  fonts: {
    mono: `'Fira Code', 'Nanum Gothic Coding', '나눔고딕코딩', monospace`,
    sans: `Pretendard, sans-serif`,
    serif: `'Noto Serif KR', serif`,
  },
})

export { media, theme, vars }
