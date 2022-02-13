import { useState } from 'react'

import { FixedStrip } from './FixedStrip'
import arrow from './assets/arrow-up.svg'
import { styled } from './stitches'
import { useScrollThreshold } from './useScrollThreshold'

const HEIGHT = 40 / 16

const Root = styled('button', {
  width: '100%',
  height: '100%',
  background: 'none',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: `${14 / 16}rem`,
  margin: 0,
  padding: 0,
})

const Arrow = styled('img', {
  marginRight: '.25rem',
})

const ScrollBack: React.VFC<{ className?: string }> = ({ className }) => {
  const [crossed, setCrossed] = useState(false)

  useScrollThreshold(400, setCrossed)

  return (
    <FixedStrip className={className} css={{ transform: `translateY(${crossed ? 0 : '100%'})` }} position="bottom">
      <Root type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Arrow alt="" src={arrow.src} />
        처음으로
      </Root>
    </FixedStrip>
  )
}

export { HEIGHT, ScrollBack }
