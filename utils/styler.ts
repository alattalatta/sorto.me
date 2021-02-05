import { createStyled } from '@stitches/react'

export const BASE10 = '$base10'
export const BASE20 = '$base20'
export const BASE40 = '$base40'
export const BASE90 = '$base90'
export const BASE100 = '$base100'
export const ACCENT_R = '$accentR'
export const ACCENT_Y = '$accentY'
export const ACCENT_B = '$accentB'
export const ACCENT_BA = '$accentBa'

export const { styled, css } = createStyled({
  tokens: {
    colors: {
      [BASE10]: '#020D19',
      [BASE20]: '#0C2640',
      [BASE40]: '#224569',
      [BASE90]: '#E2EFFD',
      [BASE100]: '#F4FBFF',
      [ACCENT_R]: '#FF5252',
      [ACCENT_Y]: '#FCEC6F',
      [ACCENT_B]: '#57D8FF',
      [ACCENT_BA]: '#6FDBFC',
    },
  },
})
