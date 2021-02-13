import createStyled, { StitchesCss } from '@stitches/react'

const stitchesConfig = createStyled({
  theme: {
    colors: {
      base10: '#020D19',
      base20: '#0C2640',
      base40: '#224569',
      base60: '#6D95BD',
      base70: '#B6D5F5',
      base90: '#E2EFFD',
      base100: '#F4FBFF',
      accentR: '#FF5252',
      accentY: '#FCEC6F',
      accentB: '#57D8FF',
      linkblueDark: '#0066CF',
      linkblueDarkHeavy: '#0041A1',
      linkblueLight: '#2B8DF2',
      linkblueLightHeavy: '#13AAFF',
    },
    radii: {
      cornerRadius: '8px',
    },
  },
})

export const { css, getCssString, styled } = stitchesConfig

export type StyleSheet = StitchesCss<typeof stitchesConfig>
