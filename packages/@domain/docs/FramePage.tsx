import type { Page } from '@lib/ui'
import { useEffect, useState } from 'react'

const FramePage: Page = () => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>): void => {
      setSrc(event.data)
    }

    window.addEventListener('message', handleMessage)

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: src }} style={{ padding: '0.5rem' }} />
}

export { FramePage }
