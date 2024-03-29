import { createTheme } from '@vanilla-extract/css'

import { contract, palette } from './colors.css'

const theme = createTheme(contract, {
  ...palette,
  fg0: palette.gray0,
  fg1: palette.gray1,
  fg2: palette.gray2,
  fg3: palette.gray3,
  bg3: palette.gray4,
  bg2: palette.gray5,
  bg1: palette.gray6,
  bg0: palette.gray7,

  fgi0: palette.gray7,
  fgi1: palette.gray6,
  fgi2: palette.gray5,
  fgi3: palette.gray4,
  bgi3: palette.gray3,
  bgi2: palette.gray2,
  bgi1: palette.gray1,
  bgi0: palette.gray0,

  highlight: '#1fc3b8',
})

export { theme }
