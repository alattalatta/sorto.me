import { useEffect, useState } from 'react'

import styles from './FrameRenderer.module.scss'

const FrameRenderer: React.FC = () => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id') ?? ''

    window.parent.postMessage(`${id}/ready`)

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

  return <div dangerouslySetInnerHTML={{ __html: src }} className={styles.root} />
}

export default FrameRenderer
