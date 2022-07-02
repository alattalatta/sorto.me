import { useRouter } from 'next/router'
import { Flipper } from 'react-flip-toolkit'

import { ContentsContainer } from './ContentsContainer'
import { NavBar } from './NavBar'
import { ScrollBack } from './ScrollBack'
import { useHighlightFragment } from './useHighlightFragment'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()

  useHighlightFragment()

  return (
    <Flipper flipKey={router.asPath}>
      <NavBar />
      <ContentsContainer>{children}</ContentsContainer>
      <ScrollBack />
    </Flipper>
  )
}

export { Layout }
