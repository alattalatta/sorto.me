import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { colors, timings } from './theme.css'

function useHighlightFragment(): void {
  const router = useRouter()

  const timingFnCache = useRef<string>()

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
        return (anchor as HTMLElement | null) || element
      })()
      if (!target) {
        return
      }

      const playingAnimation = target.getAnimations()[0]
      if (playingAnimation) {
        playingAnimation.cancel()
      }

      if (!timingFnCache.current) {
        timingFnCache.current = getComputedStyle(target).getPropertyValue(timings.linearlock.slice(4, -1)).trim()
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
          duration: 750,
          easing: timingFnCache.current || 'ease',
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
  }, [router.events])
}

export { useHighlightFragment }
