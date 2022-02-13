import { styled, FIXED_STRIP_HEIGHT, ScrollBack } from '@lib/ui'

import { NavBar } from './NavBar'

const Body = styled('div', {
  maxWidth: `${982 / 16}rem`,
  margin: `1.5rem auto ${FIXED_STRIP_HEIGHT}rem`,
  padding: '0 1rem env(safe-area-inset-bottom)',
})

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <Body>{children}</Body>
      <ScrollBack />
    </>
  )
}

export { Layout }
