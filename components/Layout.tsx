import { motion, useTransform, useViewportScroll } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { styled } from 'utils/styler'

import { Anchor } from './basics'

const HEADER_HEIGHT = '5rem'

const Header = styled(motion.nav, {
  alignItems: 'center',
  background: '#fff',
  borderBottom: '1px solid #e8ebed',
  color: '#000',
  display: 'flex',
  height: HEADER_HEIGHT,
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1,
})

const Brand = styled(motion.a, {
  '&:active': {
    backgroundColor: '#0ff',
  },
  '&:hover': {
    backgroundColor: '#f00',
  },
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '1.25rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  padding: '0.25rem',
  textDecoration: 'none',
  transformOrigin: 'left center',
})

const PageLink = styled(Anchor, {
  color: '#000',
  display: 'block',
  fontSize: '1.1em',
  marginLeft: 'auto',
  textDecoration: 'none',
})

const Body = styled('main', {
  paddingTop: HEADER_HEIGHT,
})

const Layout: React.FC = ({ children }) => {
  const [calculatedHeight, setCalculatedHeight] = useState(80)
  const { scrollY } = useViewportScroll()

  useEffect(() => {
    setCalculatedHeight(parseInt(getComputedStyle(document.documentElement).fontSize) * 5)
  }, [])

  const scrollPoints = [0, calculatedHeight * 2]

  const headerScale = useTransform(scrollY, scrollPoints, ['5rem', '2.5rem'])
  const brandScale = useTransform(scrollY, scrollPoints, [1, 0.75])
  const linkOpacity = useTransform(scrollY, scrollPoints, [1, 0])

  return (
    <div>
      <Header style={{ height: headerScale }}>
        <Link href="/">
          <Brand style={{ scale: brandScale }} href="/" title="홈으로 이동">
            Sorto.me
          </Brand>
        </Link>
        <Link href="/about">
          <PageLink as={motion.a} href="/about" style={{ opacity: linkOpacity }}>
            About
          </PageLink>
        </Link>
      </Header>
      <Body>{children}</Body>
    </div>
  )
}
export default Layout

export const getLayout = (page: JSX.Element): JSX.Element => <Layout>{page}</Layout>
