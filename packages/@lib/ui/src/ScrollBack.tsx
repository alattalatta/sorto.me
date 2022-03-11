import { useScrollThreshold } from '@lib/functions'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { useState } from 'react'

import arrow from '../assets/arrow-up.svg'
import * as styles from './ScrollBack.css'

const ScrollBack: React.VFC<{ className?: string }> = ({ className }) => {
  const [crossed, setCrossed] = useState(false)

  useScrollThreshold(400, setCrossed)

  return (
    <m.div
      animate={crossed ? 'show' : 'hidden'}
      className={clsx(
        styles.root({
          position: 'bottom',
        }),
        className,
      )}
      initial="hidden"
      transition={{
        type: 'spring',
        duration: 0.1,
      }}
      variants={{ hidden: { translateY: '100%' }, show: { translateY: 0 } }}
    >
      <button className={styles.button} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className={styles.arrow} src={arrow.src} />
        처음으로
      </button>
    </m.div>
  )
}

export { ScrollBack }
