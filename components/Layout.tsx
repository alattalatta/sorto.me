import Link from 'next/link'

import { styled } from 'utils/styler'

const HEADER_HEIGHT = '5rem'

const Header = styled('nav', {
  alignItems: 'center',
  borderBottom: '1px solid #e8ebed',
  color: '#0b0d0e',
  display: 'flex',
  height: HEADER_HEIGHT,
  paddingLeft: '1.5rem',
  position: 'fixed',
  top: 0,
  width: '100%',
})

const Brand = styled('a', {
  '&:active': {
    backgroundColor: 'red',
  },
  backgroundColor: '#0b0d0e',
  color: 'white',
  fontSize: '1.25rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  padding: '0.25rem',
  textDecoration: 'none',
})

const Body = styled('main', {
  paddingTop: HEADER_HEIGHT,
})

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header>
        <Link href="/">
          <Brand href="/">Sorto.me</Brand>
        </Link>
      </Header>
      <Body>{children}</Body>
    </div>
  )
}
export default Layout

export const getLayout = (page: JSX.Element): JSX.Element => <Layout>{page}</Layout>
