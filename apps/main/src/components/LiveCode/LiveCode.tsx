import Loading from 'components/Loading'
import type { VirtualFile } from 'components/useCodeBlockGroup'
import { useEffect, useId, useReducer, useRef } from 'react'
import { InView } from 'react-intersection-observer'

import styles from './LiveCode.module.scss'

export type Language = 'css' | 'html' | 'js'

type Props = {
  babel?: boolean
  className?: string
  files: readonly VirtualFile[]
  height?: number
  loading?: 'eager' | 'lazy'
  minHeight?: number
}

/** Live code view */
const LiveCode: React.FC<Props> = ({
  babel = false,
  className,
  files,
  height = 240,
  loading: loadingProp = 'lazy',
  minHeight,
}) => {
  const eager = loadingProp === 'eager'

  const id = useId()
  const frameRef = useRef<HTMLIFrameElement>(null)

  const [wasInView, setWasInView] = useReducer(() => true, false)
  const [loaded, setLoaded] = useReducer(() => true, false)

  useEffect(() => {
    const handleReadyMesasge = (event: MessageEvent<string>): void => {
      if (event.data === `${id}/ready`) {
        setLoaded()
      }
    }

    window.addEventListener('message', handleReadyMesasge)

    return () => window.removeEventListener('message', handleReadyMesasge)
  }, [id])

  // push changes to the frame
  useEffect(() => {
    if (loaded && frameRef.current?.contentWindow) {
      frameRef.current.contentWindow.postMessage(files)
    }
  }, [loaded, files])

  const loading = !eager && !loaded

  return (
    <InView onChange={(inView) => inView && setWasInView()}>
      {({ ref }) => (
        <div ref={ref} className={`${styles.root} ${className}`} style={{ height, minHeight }}>
          {(eager || wasInView) && (
            <iframe
              ref={frameRef}
              className={styles.frame}
              data-loading={loading}
              sandbox="allow-scripts allow-same-origin"
              src={`/frame${babel ? '/babel' : ''}?id=${id}`}
              title="예제"
            />
          )}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Loading height={height} />
          </div>
        </div>
      )}
    </InView>
  )
}

export default LiveCode
