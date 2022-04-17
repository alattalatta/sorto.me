import { createThemeContract } from '@vanilla-extract/css'

const palette = {
  gray0: '#FBFCFD',
  gray1: '#EDF0F2',
  gray2: '#D7DCDF',
  gray3: '#C1C8CD',
  gray4: '#889096',
  gray5: '#5D6266',
  gray6: '#202528',
  gray7: '#11181C',

  note: '#43E4DA',
  warn: '#FFE400',
  fatal: '#FF5858',

  notebg: '#43E4DA1A',
  warnbg: '#FFE4001A',
  fatalbg: '#FF58581A',
} as const

const contract = createThemeContract({
  ...palette,
  fg0: '',
  fg1: '',
  fg2: '',
  fg3: '',
  bg3: '',
  bg2: '',
  bg1: '',
  bg0: '',

  fgi0: '',
  fgi1: '',
  fgi2: '',
  fgi3: '',
  bgi3: '',
  bgi2: '',
  bgi1: '',
  bgi0: '',

  highlight: '',
})

export { contract, palette }
