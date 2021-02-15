import { motion as m, Variants } from 'framer-motion'

import { styled } from 'utils/styler'

const HAMBURGER_LINE_VARIANT_A: Variants = {
  menuClosed: {
    x1: 0,
    x2: 32,
    y1: 2,
    y2: 2,
  },
  menuOpened: {
    x1: [0, 0, 6],
    x2: [32, 32, 26],
    y1: [null, 12, 2],
    y2: [null, 12, 22],
    transition: {
      duration: 0.3,
    },
  },
}
const HAMBURGER_LINE_VARIANT_B: Variants = {
  menuClosed: {
    opacity: 1,
  },
  menuOpened: {
    opacity: 0,
  },
}
const HAMBURGER_LINE_VARIANT_C: Variants = {
  menuClosed: {
    x1: 0,
    x2: 32,
    y1: 22,
    y2: 22,
  },
  menuOpened: {
    x1: [0, 0, 6],
    x2: [32, 32, 26],
    y1: [null, 12, 22],
    y2: [null, 12, 2],
    transition: {
      duration: 0.3,
    },
  },
}

const HamburgerLine = styled(m.line, {
  stroke: 'currentColor',
  strokeWidth: '4px',
})

const HamburgerContainer = styled(m.button, {
  width: 52,
  background: 'none',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  marginRight: 'auto',
  padding: '14px 10px',
})

type Props = {
  opened: boolean
  onClick: React.MouseEventHandler
}
const Hamburger: React.VFC<Props> = ({ opened, onClick }) => {
  return (
    <HamburgerContainer
      animate={opened ? 'menuOpened' : 'menuClosed'}
      initial="menuClosed"
      title="메뉴 열기"
      aria-controls="header-menu"
      aria-haspopup="menu"
      aria-expanded={opened}
      onClick={onClick}
    >
      <m.svg viewBox="0 0 32 24">
        <HamburgerLine x1="0" y1="2" x2="32" y2="2" variants={HAMBURGER_LINE_VARIANT_A} />
        <HamburgerLine x1="0" y1="12" x2="32" y2="12" variants={HAMBURGER_LINE_VARIANT_B} />
        <HamburgerLine x1="0" y1="22" x2="32" y2="22" variants={HAMBURGER_LINE_VARIANT_C} />
      </m.svg>
    </HamburgerContainer>
  )
}

export default Hamburger
