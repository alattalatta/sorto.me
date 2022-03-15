import { createTheme } from '@vanilla-extract/css'

import { contract, palette } from './contract.css'

const theme = createTheme(contract, {
  ...palette,
  fg0: palette.gray7,
  fg1: palette.gray6,
  fg2: palette.gray5,
  fg3: palette.gray4,
  bg3: palette.gray3,
  bg2: palette.gray2,
  bg1: palette.gray1,
  bg0: palette.gray0,

  fgi0: palette.gray0,
  fgi1: palette.gray1,
  fgi2: palette.gray2,
  fgi3: palette.gray3,
  bgi3: palette.gray4,
  bgi2: palette.gray5,
  bgi1: palette.gray6,
  bgi0: palette.gray7,

  highlight: '#0CA79D',
})

export { theme }
