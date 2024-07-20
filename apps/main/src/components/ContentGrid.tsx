import { useCallback, useEffect, useRef, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import styles from './ContentGrid.module.scss'
import Starry from './Starry'
import imgAlatta from './alatta.svg'

type Props = {
  aside?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  header?: React.ReactNode
}

const STARRY_HEIGHT = 144

const ContentGrid: React.FC<Props> = ({ aside, children, footer, header }) => {
  const $body = useRef<HTMLDivElement>(null)
  const $nav = useRef<HTMLElement>(null)

  const [scrollDiff, setScrollDiff] = useState(0)
  const [open, setOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    if (!open && $body.current) {
      const scrollY = window.scrollY
      if (scrollY < STARRY_HEIGHT) {
        setScrollDiff(STARRY_HEIGHT - scrollY)
      } else {
        setScrollDiff(0)
      }

      setTimeout(() => {
        if ($nav.current) {
          $nav.current.focus()
        }
      }, 100)
    }

    setOpen(!open)
  }, [open])

  // there's no other inert maker
  // being lazy
  useEffect(() => {
    if (!$body.current) {
      return
    }

    if (open) {
      $body.current.inert = true
    } else {
      $body.current.inert = false
    }
  }, [open])

  return (
    <div
      className={styles.root}
      style={{ ['--starry-height' as string]: `${STARRY_HEIGHT}px`, ['--scroll-diff' as string]: `${scrollDiff}px` }}
    >
      <header className={styles.header} data-open={open}>
        <RemoveScroll className={styles.navWrap} enabled={open}>
          <div className={styles.logo}>
            <a href="/">
              <img alt="ALATTA" src={imgAlatta.src} />
            </a>
            <Starry />
          </div>
          <nav ref={$nav} aria-label="목차와 메뉴" className={styles.nav} id="postgrid-nav" tabIndex={-1}>
            {header}
          </nav>
        </RemoveScroll>
      </header>
      <button
        aria-controls="postgrid-nav"
        aria-expanded={open}
        className={styles.opener}
        type="button"
        onClick={toggleOpen}
      >
        <span className="no-screen">{open ? '목차와 메뉴 닫기' : '목차와 메뉴 열기'}</span>
        <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
          {open ? (
            <path
              clipRule="evenodd"
              d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          ) : (
            <path
              clipRule="evenodd"
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          )}
        </svg>
      </button>
      {aside && <aside className={styles.aside}>{aside}</aside>}
      <div ref={$body} className={styles.body} id="postgrid-body">
        {children}
      </div>
      <footer className={styles.footer}>{footer}</footer>
    </div>
  )
}

export default ContentGrid
