import { styled } from 'utils/styler'

const Header = styled('nav', {
  alignItems: 'center',
  background: '#ededee',
  color: '#0b0d0e',
  display: 'flex',
  height: '5rem',
})

const Brand = styled('span', {
  fontWeight: 700,
  letterSpacing: '0.2em',
})

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header>
        <Brand>Sorto.me</Brand>
      </Header>
      {children}
    </div>
  )
}
export default Layout

export const getLayout = (page: JSX.Element): JSX.Element => <Layout>{page}</Layout>
