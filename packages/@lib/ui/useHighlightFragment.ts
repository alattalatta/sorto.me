import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { colors } from './theme.css'

function useHighlightFragment(): void {
  const router = useRouter()

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
    const initialHighlight = window.setTimeout(highlightFragment, 750)

    router.events.on('routeChangeComplete', highlightFragment)
    window.addEventListener('hashchange', highlightFragment)

    return () => {
      router.events.off('routeChangeComplete', highlightFragment)

      window.clearTimeout(initialHighlight)
      window.removeEventListener('hashchange', highlightFragment)
    }
  }, [])
}

export { useHighlightFragment }
