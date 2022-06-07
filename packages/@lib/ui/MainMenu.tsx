import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import * as styles from './MainMenu.css'
import * as noScreen from './noScreen.css'

const MainMenu: React.FC = () => {
  const router = useRouter()
  const pathname = router.pathname

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = (): void => setOpen(false)
    router.events.on('routeChangeComplete', close)
    router.events.on('routeChangeError', close)

    return () => {
      router.events.off('routeChangeComplete', close)
      router.events.off('routeChangeError', close)
    }
  }, [router])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className={styles.trigger} type="button">
          <HamburgerMenuIcon />
          <span className={noScreen.root}>설정</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.body}>
          <Dialog.Title className={noScreen.root}>메뉴</Dialog.Title>
          <span>
            <Link href="/" passHref>
              <a className={styles.item({ home: true })}>sorto.me</a>
            </Link>
          </span>
          <span className={styles.itemWrap}>
            <Link href="/posts" passHref>
              <a className={styles.item({ current: pathname.startsWith('/posts') })}>블로그</a>
            </Link>
          </span>
          <span className={styles.itemWrap}>
            <Link href="/docs/Web" passHref>
              <a className={styles.item({ current: pathname.startsWith('/docs') })}>문서</a>
            </Link>
          </span>
          <span className={styles.itemWrap}>
            {/* gcse causes issue with React, so don't use client side routing here */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className={styles.item({ current: pathname.startsWith('/search') })} href="/search">
              검색
            </a>
          </span>
          <Dialog.Close className={styles.close}>
            <Cross1Icon />
            <span className={noScreen.root}>닫기</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { MainMenu }
