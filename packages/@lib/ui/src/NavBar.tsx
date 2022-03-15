import Link from 'next/link'
import { useRouter } from 'next/router'

import * as styles from './NavBar.css'
import { ThemeSwitch } from './ThemeSwitch'

const NavBar: React.VFC = () => {
  const pathname = useRouter().pathname

  return (
    <nav className={styles.root}>
      <Link href="/" passHref>
        <a className={styles.item({ current: pathname === '/' })}>sorto.me</a>
      </Link>
      <Link href="/posts" passHref>
        <a className={styles.item({ current: pathname.startsWith('/posts') })}>블로그</a>
      </Link>
      <Link href="/docs/Web" passHref>
        <a className={styles.item({ current: pathname.startsWith('/docs') })}>문서</a>
      </Link>
      {/* gcse causes issue with React, so don't use client side routing here */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className={styles.item({ current: pathname.startsWith('/search') })} href="/search">
        검색
      </a>
      <span className={styles.alignRight}>
        <ThemeSwitch />
      </span>
    </nav>
  )
}

export { NavBar }
