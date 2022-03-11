import { throttle } from '@lib/functions'
import { useEffect, useMemo, useState } from 'react'

import * as styles from './Splash.css'

const THETA = 28.85

const Splash: React.FC = ({ children }) => {
  const [width, setWidth] = useState(0)
  const [scroll, setScroll] = useState(0)

  const setScrolledThrottled = useMemo(() => throttle(setScroll, 10, { leading: false, trailing: true }), [])
  const updateWidthThrottled = useMemo(
    () =>
      throttle(
        () => {
          setWidth(calculateStripWidth(document.documentElement.scrollWidth, window.innerHeight))
        },
        100,
        { leading: false, trailing: true },
      ),
    [],
  )

  useEffect(() => {
    const scrollHandler = (): void => setScrolledThrottled(window.scrollX)

    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [setScrolledThrottled])

  useEffect(() => {
    updateWidthThrottled()

    window.addEventListener('resize', updateWidthThrottled)
    return () => window.removeEventListener('resize', updateWidthThrottled)
  }, [updateWidthThrottled])

  return (
    <>
      <div className={styles.stripRoot}>
        <div className={styles.stripWrap}>
          <div className={styles.strip} style={{ width, transform: `translateX(-${scroll / 5}px) rotate(28.85deg)` }} />
        </div>
      </div>
      {children && <div className={styles.contentsRoot}>{children}</div>}
    </>
  )
}

export { Splash }

function rad(d: number): number {
  return (d * Math.PI) / 180
}

function calculateStripWidth(ww: number, wh: number): number {
  const vw = window.innerWidth
  const diff = (ww - vw) / 5
  const width = vw + diff

  const radtheta = rad(THETA)

  const cos = Math.cos(radtheta)

  if (Math.atan2(wh - 117, width) >= radtheta) {
    const a1 = 50 / cos
    const a2 = width / cos

    return a1 + a2
  }

  const sin = Math.sin(radtheta)

  if (Math.atan2(wh, width - 671) <= radtheta) {
    const a1 = 671 * cos
    const a2 = wh / sin

    return a1 + a2
  }

  const a1 = 671 * cos

  const w2 = width - 671
  const a2 = w2 / cos

  const h2 = a2 * sin
  const h3 = wh - h2

  const a3 = h3 * sin

  return a1 + a2 + a3
}
