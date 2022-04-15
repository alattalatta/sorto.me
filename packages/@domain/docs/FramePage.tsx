import type { Page } from '@lib/ui'
import { theme } from '@lib/ui/theme/light.css'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import * as styles from './FramePage.css'

const FramePage: Page = () => {
  const query = useRouter().query
  const [src, setSrc] = useState('')

  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>): void => {
      setSrc(event.data)
    }

    window.addEventListener('message', handleMessage)

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  useEffect(() => {
    const script = document.getElementById('dynascript')
    if (script && script.textContent) {
      eval(script.textContent)
    }
  }, [src])

  return (
    <div dangerouslySetInnerHTML={{ __html: src }} className={clsx(styles.root, 'forceLightTheme' in query && theme)} />
  )
}
FramePage.disableTracking = true

export { FramePage }
