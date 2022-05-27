import { ContentsContainer } from './ContentsContainer'
import { NavBar } from './NavBar'
import { ScrollBack } from './ScrollBack'
import { useHighlightFragment } from './useHighlightFragment'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useHighlightFragment()

  return (
    <>
      <NavBar />
      <ContentsContainer>{children}</ContentsContainer>
      <ScrollBack />
    </>
  )
}

export { Layout }
