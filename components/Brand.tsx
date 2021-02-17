import { motion as m, Variants } from 'framer-motion'
import React from 'react'

import { ACCENT_B, ACCENT_R, BASE_10, styled } from 'utils/styler'
import { PropOf } from 'utils/types'

import { Anchor } from './basics'

const ROOT_VARIANTS: Variants = {
  initial: {
    clipPath: 'inset(0% 100% 0% 0%)',
    opacity: 0.6,
  },
  present: {
    clipPath: 'inset(0% 0% 0% 0%)',
    fill: BASE_10,
    opacity: 1,
  },
  hover: {
    fill: ACCENT_R,
  },
  tap: {
    fill: BASE_10,
    transition: {
      type: false,
    },
  },
}

const SHADOW_VARIANTS: Variants = {
  initial: { fill: BASE_10, opacity: 0 },
  hover: { fill: ACCENT_B, opacity: 1, transform: 'translateX(8px)' },
}

const Root = styled(m.div, {
  paddingRight: 16,
  position: 'relative',
})

const SVGRoot = styled(m.svg, {
  height: 24,
  fill: 'inherit',
})

const Shadow = styled(m.div, {
  position: 'absolute',
  top: 0,
  left: 0,
})

const Body: React.VFC<PropOf<typeof SVGRoot>> = (props) => {
  return (
    <SVGRoot xmlns="http://www.w3.org/2000/svg" viewBox="0 0 975.1 220.8" {...props}>
      <path d="M156.4 128.2c0 31.2-25.9 61.2-77.6 61.2-44.2 0-80.8-20.6-78.7-61.7a2.7 2.7 0 012.5-2.3h35.8a2.3 2.3 0 012.3 2.3c1.5 20 14.2 32.7 40.6 32.7 27.2 0 34-14.2 34-23.6 0-35-97.2-15.2-97.2-74.4C18 32 42.7 3.8 94.5 3.8c38.8 0 69.6 15.2 71.8 54a2.3 2.3 0 01-2.3 2.4h-36a2.3 2.3 0 01-2.3-2.3C124.7 43 112 33 92 33c-19 0-33.5 8.6-33.5 21.6 0 32.5 98 15.5 98 73.6zM246 189.1c-49.8 0-80.5-30.5-80.5-75.1 0-62 44.2-110.2 102.9-110.2 49.5 0 81 28.7 81 74.1 0 58.7-43.5 111.2-103.4 111.2zm2-29.7c38 0 61.2-36.3 61.2-80 0-28.7-16.3-46-42.7-46-37.8 0-61.1 37.4-61.1 80 0 29 16.5 46 42.7 46zM429.6 145.7l-11.2-26.4h-25.7l-14 63.7a3 3 0 01-2.7 2.3h-34.8a1.8 1.8 0 01-1.8-2.3l21.1-86.5 19-86.6a3 3 0 012.8-2.3h67.3c37.8 0 60.7 15.8 60.7 45.7 0 32.8-18.6 55-50 62.7l28.2 67.3a1.6 1.6 0 01-1.6 2h-40.3a3.8 3.8 0 01-3-2zm17.5-110h-34.6l-13.4 55.4h40.3c16.3 0 32.8-9.9 32.8-33.5 0-14.7-8.1-21.8-25.1-21.8zM532.6 185.3a1.9 1.9 0 01-1.8-2.3l21.6-86.5 12.7-60.2h-49a1.9 1.9 0 01-1.8-2.3L520 9.9a3 3 0 012.8-2.3h137.6A1.8 1.8 0 01662 10L656.4 34a3 3 0 01-2.8 2.3h-49l-15.2 60.2-18.3 86.5a3 3 0 01-2.8 2.3z" />
      <path d="M716.1 189.1c-49.7 0-80.5-30.5-80.5-75.1 0-62 44.2-110.2 102.9-110.2 49.5 0 81 28.7 81 74.1 0 58.7-43.5 111.2-103.4 111.2zm2-29.7c38 0 61.2-36.3 61.2-80 0-28.7-16.3-46-42.7-46-37.8 0-61.1 37.4-61.1 80 0 29 16.5 46 42.6 46zM807.2 185.3a1.8 1.8 0 01-1.7-2.3l7.3-31.7a3 3 0 012.8-2.3h35a1.8 1.8 0 011.8 2.3L845 183a3 3 0 01-2.7 2.3zm22.4-94.4a1.9 1.9 0 01-1.8-2.3l7.4-31.7a3 3 0 012.8-2.3h35a1.8 1.8 0 011.7 2.3l-7.3 31.7a3 3 0 01-2.8 2.3zM853.4 220.8a1.8 1.8 0 01-1.8-2.2l50-216.3a3 3 0 012.9-2.3h23.3a1.8 1.8 0 011.8 2.3l-50 216.3a3 3 0 01-2.8 2.2zM898.9 220.8a1.8 1.8 0 01-1.8-2.2L947 2.3a3 3 0 012.8-2.3h23.3a1.8 1.8 0 011.8 2.3l-50 216.3a3 3 0 01-2.8 2.2z" />
    </SVGRoot>
  )
}

const Brand: React.VFC = () => {
  return (
    <Root variants={ROOT_VARIANTS} initial="initial" animate="present" exit="initial" whileHover="hover" whileTap="tap">
      <Anchor href="/" title="홈으로 이동" aria-label="홈으로 이동">
        <Body css={{ mixBlendMode: 'multiply', position: 'relative', zIndex: 1 }} />
        <Shadow variants={SHADOW_VARIANTS}>
          <Body />
        </Shadow>
      </Anchor>
    </Root>
  )
}

export default Brand
