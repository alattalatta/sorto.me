import { motion as m, Variants } from 'framer-motion'

import { ACCENT_B, ACCENT_R, BASE_10, BASE_100, styled } from 'utils/styler'

const ROOT_VARIANTS: Variants = {
  // colors
  dark: {
    stroke: BASE_10,
  },
  light: {
    stroke: BASE_100,
  },
  // states
  hover: {
    stroke: ACCENT_R,
  },
}

const CONTAINER_VARIANTS: Variants = {
  closed: {
    transform: 'translateX(0px)',
  },
  hover: {
    transform: 'translateX(-3px)',
  },
}

const SHADOW_VARIANTS: Variants = {
  // colors
  dark: {
    stroke: BASE_10,
  },
  light: {
    stroke: BASE_100,
  },
  // states
  closed: {
    opacity: 0,
  },
  hover: {
    stroke: ACCENT_B,
    opacity: 1,
    transform: 'translateX(3px)',
  },
}

const HAMBURGER_LINE_VARIANTS_A: Variants = {
  closed: {
    d: [null, 'M0 12 L16 12 L32 12', 'M0 1.5 L16 1.5 L32 1.5'],
    transition: {
      duration: 0.3,
    },
  },
  opened: {
    d: [null, 'M0 12 L16 12 L32 12', 'M6 1.5 L16 12 L26 1.5'],
    transition: {
      duration: 0.3,
    },
  },
}
const HAMBURGER_LINE_VARIANTS_B: Variants = {
  closed: {
    opacity: 1,
  },
  opened: {
    opacity: 0,
  },
}
const HAMBURGER_LINE_VARIANTS_C: Variants = {
  closed: {
    d: [null, 'M0 12 L16 12 L32 12', 'M0 22.5 L16 22.5 L32 22.5'],
    transition: {
      duration: 0.3,
    },
  },
  opened: {
    d: [null, 'M0 12 L16 12 L32 12', 'M6 22.5 L16 12 L26 22.5'],
    transition: {
      duration: 0.3,
    },
  },
}

const Root = styled(m.button, {
  width: 52,
  background: 'none',
  border: 0,
  cursor: 'pointer',
  marginRight: 16,
  padding: '14px 10px',
  position: 'relative',
  zIndex: 1, // need this for mixin-blend-mode
  variants: {
    brightness: {
      dark: {
        stroke: '$base10',
      },
      light: {
        stroke: '$base100',
      },
    },
  },
  defaultVariants: {
    brightness: 'dark',
  },
})

const Container = styled(m.svg, {
  position: 'relative',
  stroke: 'inherit',
  zIndex: 1,
  variants: {
    brightness: {
      dark: {},
      light: {},
    },
    shadow: {
      false: {
        position: 'relative',
        zIndex: 1,
      },
    },
  },
  compoundVariants: [
    {
      brightness: 'dark',
      shadow: 'false',
      css: {
        mixBlendMode: 'multiply',
      },
    },
    {
      brightness: 'light',
      shadow: 'false',
      css: {
        mixBlendMode: 'color-dodge',
      },
    },
  ],
})

const Line = styled(m.line, {
  fill: 'none',
  strokeWidth: '3px',
})

const Shadow = styled(m.div, {
  width: 32,
  height: 24,
  position: 'absolute',
  top: 14,
  left: 10,
  stroke: 'inherit',
})

type Props = {
  brightness: 'dark' | 'light'
  opened: boolean
  onClick: React.MouseEventHandler
}
const Hamburger: React.VFC<Props> = ({ brightness, opened, onClick }) => {
  return (
    <Root
      brightness={brightness}
      title="메뉴 열기"
      variants={ROOT_VARIANTS}
      animate={[brightness, opened ? 'opened' : 'closed']}
      initial={[brightness, 'closed']}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      aria-controls="header-menu"
      aria-expanded={opened}
    >
      <Container brightness={brightness} shadow="false" viewBox="0 0 32 24" variants={CONTAINER_VARIANTS}>
        <Line as={m.path} d="M0 1.5 h16 h16" variants={HAMBURGER_LINE_VARIANTS_A} />
        <Line x1="0" y1="12" x2="32" y2="12" variants={HAMBURGER_LINE_VARIANTS_B} />
        <Line as={m.path} d="M0 22.5 h16 h16" variants={HAMBURGER_LINE_VARIANTS_C} />
      </Container>
      <Shadow variants={SHADOW_VARIANTS}>
        <Container viewBox="0 0 32 24">
          <Line as={m.path} d="M0 1.5 h16 h16" variants={HAMBURGER_LINE_VARIANTS_A} />
          <Line x1="0" y1="12" x2="32" y2="12" variants={HAMBURGER_LINE_VARIANTS_B} />
          <Line as={m.path} d="M0 22.5 h16 h16" variants={HAMBURGER_LINE_VARIANTS_C} />
        </Container>
      </Shadow>
    </Root>
  )
}

export default Hamburger
