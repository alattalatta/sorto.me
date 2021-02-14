import { StitchesVariants } from '@stitches/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { styled } from 'utils/styler'

import { Anchor, Container as ContainerBase } from '../basics'
import Hamburger from './Hamburger'

const HEADER_HEIGHT = 84

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

const HeaderMenu = styled('nav', {
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

export const HeaderNavMenu = styled('ul', {
  listStyle: 'none',
  paddingLeft: 0,
})

export const HeaderNavMenuItem = styled(Anchor, {
  display: 'block',
  fontSize: 36,
  marginTop: 36,
  textDecoration: 'none',
  '&:hover:not([aria-disabled])': {
    textDecoration: 'underline',
  },
})

export type HeaderVariants = StitchesVariants<typeof Root>

type Props = {
  children: {
    brand: React.ReactNode
    menu: React.ReactNode
  }
} & HeaderVariants

const BaseHeader: React.VFC<Props> = ({ brightness, children: { brand, menu } }) => {
  const router = useRouter()
  const [menuOpened, setMenuOpened] = useState(false)

  useEffect(() => {
    const closeWhenRouteChanges = () => setMenuOpened(false)

    router.events.on('routeChangeComplete', closeWhenRouteChanges)

    return () => router.events.off('routeChangeComplete', closeWhenRouteChanges)
  }, [])

  useEffect(() => {
    if (menuOpened) {
      document.body.classList.add('o')
      document.querySelector('main')?.setAttribute('aria-hidden', 'true')
    } else {
      document.body.classList.remove('o')
      document.querySelector('main')?.setAttribute('aria-hidden', 'false')
    }

    return () => {
      document.body.classList.remove('o')
      document.querySelector('main')?.setAttribute('aria-hidden', 'false')
    }
  }, [menuOpened])

  return (
    <>
      <Root brightness={brightness} position={menuOpened ? 'fixed' : 'normal'} role="navigation">
        <Container>
          <Hamburger opened={menuOpened} onClick={() => setMenuOpened(!menuOpened)} />
          {brand}
        </Container>
      </Root>
      <HeaderMenu id="header-menu" hidden={!menuOpened} role="menu">
        {menu}
      </HeaderMenu>
      {menuOpened && <RootFill />}
    </>
  )
}

export default BaseHeader