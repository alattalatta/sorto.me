import Link from 'next/link'
import { useRouter } from 'next/router'

import { styled } from './stitches'

const Root = styled('nav', {
  maxWidth: `${982 / 16}rem`,
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  fontSize: `${14 / 16}rem`,
  margin: '0 auto',
  padding: '0 1rem',
  position: 'relative',
  zIndex: 1,
})

const Item = styled('a', {
  color: 'inherit',
  fontWeight: 700,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
  '& + &': {
    marginLeft: '2rem',
  },
  variants: {
    current: {
      true: {
        opacity: 0.6,
      },
    },
  },
})

const NavBar: React.VFC = () => {
  const pathname = useRouter().pathname

  return (
    <Root>
      <Link href="/" passHref>
        <Item current={pathname === '/'}>sorto.me</Item>
      </Link>
      <Link href="/posts" passHref>
        <Item css={{ marginLeft: 'auto !important' }} current={pathname.startsWith('/posts')}>
          블로그
        </Item>
      </Link>
      <Link href="/docs/Web" passHref>
        <Item current={pathname.startsWith('/docs')}>문서</Item>
      </Link>
      {/* gcse causes issue with React, so don't use client side routing here */}
      <Item current={pathname.startsWith('/search')} href="/search">
        검색
      </Item>
    </Root>
  )
}

export { NavBar }
