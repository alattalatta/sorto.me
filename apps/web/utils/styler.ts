import type { CSS } from '@stitches/react';
import { createStitches } from '@stitches/react'
import type { Tween } from 'framer-motion'
import type { Easing } from 'framer-motion/types/types'

export const BASE_10 = '#020D19'
export const BASE_100 = '#F4FBFF'
export const ACCENT_R = '#FF5252'
export const ACCENT_Y = '#FCEC6F'
export const ACCENT_B = '#57D8FF'

const stitchesConfig = createStitches({
  media: {
    wide: '(max-width: 1600px)',
    broad: '(max-width: 1280px)',
    medium: '(max-width: 1024px)',
    narrow: '(max-width: 768px)',
    tiny: '(max-width: 480px)',
  },
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
      linkblueDarkHover: '#009A29',
      linkblueLight: '#2B8DF2',
      linkblueLightHover: '#0AC556',
    },
    fonts: {
      mono: '"Nanum Gothic Coding", "나눔고딕코딩", monospace',
      sans: '"Nanum Gothic", sans-serif',
    },
    radii: {
      cornerRadius: '8px',
    },
  },
})

export const {
  css,
  getCssText,
  styled,
  theme: { colors },
} = stitchesConfig

export type StyleSheet = CSS<typeof stitchesConfig>

export const STANDARD_EASE: Easing = [0.4, 0, 0.2, 1]

/** Returns a standard easing definition object. */
export function easeStandard(duration: number): Tween {
  return {
    type: 'tween',
    ease: STANDARD_EASE,
    duration,
  }
}
