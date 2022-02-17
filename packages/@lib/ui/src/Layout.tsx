import { HEIGHT as FIXED_STRIP_HEIGHT } from './FixedStrip'
import { NavBar } from './NavBar'
import { ScrollBack } from './ScrollBack'
import { styled } from './stitches'

const Body = styled('div', {
  maxWidth: `${982 / 16}rem`,
  margin: `1.5rem auto ${FIXED_STRIP_HEIGHT}rem`,
  paddingBottom: 'env(safe-area-inset-bottom)',
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
