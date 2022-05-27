import { useEffect } from 'react'

import * as styles from './Layout.css'
import { NavBar } from './NavBar'
import { ScrollBack } from './ScrollBack'
import { colors } from './theme.css'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // highlight fragment the hash points
  useEffect(() => {
    const highlightFragment = (): void => {
      const hash = decodeURIComponent(location.hash.slice(1))
      if (!hash) {
        return
      }

      const target = (() => {
        const element = document.getElementById(hash)
        if (!element) {
          return
        }

        const anchor = element.querySelector('a a')
        return anchor || element
      })()
      if (!target) {
        return
      }

      const playingAnimation = target.getAnimations()[0]
      if (playingAnimation) {
        playingAnimation.cancel()
      }

      target.animate(
        [
          {
            background: colors.highlight,
          },
          {
            background: 'transparent',
          },
        ],
        {
          duration: 1000,
          easing: 'ease',
        },
      )
    }

    // highlight on page load
    const initialHighlight = window.setTimeout(highlightFragment, 1000)

    window.addEventListener('hashchange', highlightFragment)
    return () => {
      window.clearTimeout(initialHighlight)
      window.removeEventListener('hashchange', highlightFragment)
    }
  }, [])

  return (
    <>
      <NavBar />
      <div className={styles.body}>{children}</div>
      <ScrollBack />
    </>
  )
}

export { Layout }
