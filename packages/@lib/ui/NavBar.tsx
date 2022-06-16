import Link from 'next/link'
import { useRouter } from 'next/router'

import { MainMenu } from './MainMenu'
import * as styles from './NavBar.css'
import { PrefMenu } from './PrefMenu'

const NavBar: React.FC = () => {
  const pathname = useRouter().pathname

  return (
    <>
      <nav className={styles.root}>
        <div className={styles.container}>
          <span className={styles.mobileMenu}>
            <MainMenu />
          </span>
          <span>
            <Link href="/" passHref>
              <a className={styles.anchor}>sorto.me</a>
            </Link>
          </span>
          <span className={styles.item({ current: pathname.startsWith('/posts') })}>
            <Link href="/posts" passHref>
              <a className={styles.anchor}>블로그</a>
            </Link>
          </span>
          <span className={styles.item({ current: pathname.startsWith('/docs') })}>
            <Link href="/docs/Web" passHref>
              <a className={styles.anchor}>문서</a>
            </Link>
          </span>
          <span className={styles.item({ current: pathname.startsWith('/search') })}>
            {/* gcse causes issue with React, so don't use client side routing here */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className={styles.anchor} href="/search">
              검색
            </a>
          </span>
          <span className={styles.alignRight}>
            <PrefMenu />
          </span>
        </div>
      </nav>
      <div className={styles.filler} />
    </>
  )
}

export { NavBar }
