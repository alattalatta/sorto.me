import { motion as m, Variants } from 'framer-motion'

import { ACCENT_B, ACCENT_R, BASE_10, styled } from 'utils/styler'

const CONTAINER_VARIANTS: Variants = {
  closed: {
    stroke: BASE_10,
    transform: 'translateX(0px)',
  },
  hover: {
    stroke: ACCENT_R,
    transform: 'translateX(-3px)',
  },
}

const SHADOW_VARIANTS: Variants = {
  closed: { stroke: BASE_10, opacity: 0 },
  hover: { stroke: ACCENT_B, opacity: 1, transform: 'translateX(3px)' },
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
})

const Container = styled(m.svg, {
  position: 'relative',
  zIndex: 1,
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
})

type Props = {
  opened: boolean
  onClick: React.MouseEventHandler
}
const Hamburger: React.VFC<Props> = ({ opened, onClick }) => {
  return (
    <Root
      title="메뉴 열기"
      animate={opened ? 'opened' : 'closed'}
      initial="closed"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      aria-controls="header-menu"
      aria-haspopup="menu"
      aria-expanded={opened}
    >
      <Container css={{ mixBlendMode: 'multiply' }} viewBox="0 0 32 24" variants={CONTAINER_VARIANTS}>
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
