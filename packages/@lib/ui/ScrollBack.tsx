import { useScrollThreshold } from '@lib/functions'
import clsx from 'clsx'
import { useState } from 'react'

import * as styles from './ScrollBack.css'

const ScrollBack: React.FC<{ className?: string }> = ({ className }) => {
  const [crossed, setCrossed] = useState(false)

  useScrollThreshold(400, setCrossed)

  return (
    <div
      className={clsx(
        styles.root({
          show: crossed,
          position: 'bottom',
        }),
        className,
      )}
    >
      <button className={styles.button} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg className={styles.arrow} height="10" viewBox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 0L10 5.71429H8.66666L5.5 2.09525V10H4.5V2.09525L1.33334 5.71429H0L5 0Z" />
        </svg>
        처음으로
      </button>
    </div>
  )
}

export { ScrollBack }
