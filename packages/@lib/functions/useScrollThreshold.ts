import { useCallback, useEffect, useRef } from 'react'

function useScrollThreshold(threshold: number, onCross: (crossed: boolean) => void): void {
  const didCross = useRef(false)
  const raf = useRef<number | null>(null)

  const handleScroll = useCallback(() => {
    if (raf.current) {
      window.cancelAnimationFrame(raf.current)
    }

    raf.current = window.requestAnimationFrame(() => {
      const crossed = window.scrollY > threshold

      if (didCross.current !== crossed) {
        onCross(crossed)
        didCross.current = crossed
      }
    })
  }, [didCross, threshold, onCross])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
}

export { useScrollThreshold }
