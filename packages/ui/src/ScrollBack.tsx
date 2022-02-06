import { useState } from 'react'

import arrow from './arrow-up.svg'
import { styled } from './stitches'
import { useScrollThreshold } from './useScrollThreshold'

const HEIGHT = 40 / 16

const Root = styled('button', {
  width: '100%',
  maxWidth: `${980 / 16}rem`,
  height: `${HEIGHT}rem`,
  background: '#2c2c2c',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: `${14 / 16}rem`,
  margin: '0 auto',
  padding: 0,
  paddingBottom: 'env(safe-area-inset-bottom)',
  position: 'fixed',
  right: 0,
  bottom: 0,
  left: 0,
  transition: 'transform 250ms ease',
  zIndex: 5,
})

const Arrow = styled('img', {
  marginRight: '.25rem',
})

const ScrollBack: React.VFC<{ className?: string }> = ({ className }) => {
  const [crossed, setCrossed] = useState(false)

  useScrollThreshold(400, setCrossed)

  return (
    <Root
      className={className}
      css={{ transform: `translateY(${crossed ? 0 : '100%'})` }}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Arrow alt="" src={arrow} />
      처음으로
    </Root>
  )
}

export { HEIGHT, ScrollBack }
