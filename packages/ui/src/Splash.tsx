import { useEffect, useMemo, useRef, useState } from 'react'

import { styled } from './stitches'
import color from './the-color.svg'
import { throttle } from './throttle'

const THETA = 28.85
const HEIGHT = 427
const OFFSET_TOP = 338
const OFFSET_LEFT = 50

const StripRoot = styled('div', {
  overflow: 'hidden',
  position: 'fixed',
  inset: 0,
})

const StripWrap = styled('div', {
  height: '100%',
  position: 'relative',
})

const Strip = styled('div', {
  height: HEIGHT,
  background: `url(${color})`,
  position: 'absolute',
  top: -OFFSET_TOP,
  left: -OFFSET_LEFT,
  transform: `rotate(${THETA}deg)`,
  transformOrigin: 'bottom left',
  transition: 'transform 50ms ease-out',
})

const ContentsRoot = styled('div', {
  overflowX: 'auto',
  position: 'fixed',
  inset: 0,
})

const ContentsWrap = styled('div', {
  fontSize: 36,
  marginLeft: 99,
  position: 'relative',
  top: 522,
  transform: 'rotate(-15deg)',
  transformOrigin: 'top left',
  whiteSpace: 'nowrap',
  zIndex: 1,
})

const Splash: React.FC = ({ children }) => {
  const contentsRoot = useRef<HTMLDivElement>(null)

  const [width, setWidth] = useState(0)
  const [scroll, setScroll] = useState(0)

  const updateScrollThrottled: React.UIEventHandler = useMemo(
    () =>
      throttle((event) => setScroll((event.target as HTMLElement).scrollLeft), 10, { leading: false, trailing: true }),
    [],
  )
  const updateWidthThrottled = useMemo(
    () =>
      throttle(
        () => {
          contentsRoot.current && setWidth(calculateStripWidth(contentsRoot.current.scrollWidth, window.innerHeight))
        },
        100,
        { leading: false, trailing: true },
      ),
    [],
  )

  useEffect(() => {
    updateWidthThrottled()

    window.addEventListener('resize', updateWidthThrottled)
    return () => window.removeEventListener('resize', updateWidthThrottled)
  }, [updateWidthThrottled])

  return (
    <>
      <StripRoot>
        <StripWrap>
          <Strip css={{ width, transform: `translateX(-${scroll / 5}px) rotate(28.85deg)` }} />
        </StripWrap>
      </StripRoot>
      {children && (
        <ContentsRoot ref={contentsRoot} onScroll={updateScrollThrottled}>
          <ContentsWrap>{children}</ContentsWrap>
        </ContentsRoot>
      )}
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
