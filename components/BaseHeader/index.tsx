import { AnimatePresence, motion as m, Variants } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { makeScrollLocker } from 'utils/element'
import { styled } from 'utils/styler'

import { Container as ContainerBase } from '../basics'
import Hamburger from './Hamburger'

export const HEADER_HEIGHT = 84

const HEADER_MENU_VARIANTS: Variants = {
  opened: {
    backgroundColor: '#fff',
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    visibility: 'visible',
    transition: {
      type: 'tween',
      ease: 'anticipate',
    },
  },
  closed: {
    backgroundColor: '#B6D5F5',
    opacity: 0,
    transition: {
      type: false,
    },
    transitionEnd: {
      clipPath: 'inset(0% 100% 0% 0%)',
      visibility: 'hidden',
    },
  },
}

const Root = styled('nav', {
  width: '100%',
  variants: {
    brightness: {
      dark: {
        background: '$base10',
        color: '$base100',
      },
      light: {
        background: '#fff',
        color: '$base20',
      },
    },
    position: {
      fixed: {
        position: 'fixed',
        top: 0,
        left: 0,
      },
      normal: {},
    },
  },
  defaultVariants: {
    brightness: 'light',
  },
})

const RootFill = styled('div', {
  height: HEADER_HEIGHT,
})

const Container = styled(ContainerBase, {
  height: HEADER_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  paddingTop: 16,
  paddingBottom: 16,
})

const HeaderMenu = styled(m.nav, {
  width: '100%',
  background: '#fff',
  paddingTop: 26,
  paddingBottom: 36,
  position: 'fixed',
  top: HEADER_HEIGHT,
  bottom: 0,
  left: 0,
  zIndex: 9,
  '& a': {
    color: 'inherit',
  },
})

type Props = {
  brightness?: 'dark' | 'light'
  children: {
    brand?: React.ReactNode
    menu: React.ReactNode
  }
}

const BaseHeader: React.VFC<Props> = ({ brightness = 'light', children: { brand, menu } }) => {
  const router = useRouter()
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    const closeWhenRouteChanges = () => setMenuOpened(false)

    router.events.on('routeChangeComplete', closeWhenRouteChanges)

    return () => router.events.off('routeChangeComplete', closeWhenRouteChanges)
  }, [])

  const scrollLock = makeScrollLocker(() => document.querySelectorAll('#main'))
  useEffect(() => {
    scrollLock(menuOpened)

    return () => {
      scrollLock(false)
    }
  }, [menuOpened])

  const reversedBrightness = brightness === 'light' ? 'dark' : 'light'

  return (
    <>
      <Root id="header" brightness={brightness} position={menuOpened ? 'fixed' : 'normal'} role="navigation">
        <Container>
          <Hamburger brightness={reversedBrightness} opened={menuOpened} onClick={() => setMenuOpened(!menuOpened)} />
          <AnimatePresence>{brand}</AnimatePresence>
        </Container>
      </Root>
      <HeaderMenu
        id="header-menu"
        aria-hidden={!menuOpened}
        role="menu"
        variants={HEADER_MENU_VARIANTS}
        initial="closed"
        animate={menuOpened ? 'opened' : 'closed'}
      >
        {menu}
      </HeaderMenu>
      {menuOpened && <RootFill />}
    </>
  )
}

export default BaseHeader
