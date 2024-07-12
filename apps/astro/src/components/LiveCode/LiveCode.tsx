import Loading from 'components/Loading'
import type { VirtualFile } from 'components/useCodeBlockGroup'
import { useEffect, useId, useReducer, useRef, useState } from 'react'
import { InView } from 'react-intersection-observer'

import styles from './LiveCode.module.scss'

export type Language = 'css' | 'html' | 'js'

type Props = {
  className?: string
  files: readonly VirtualFile[]
  height?: number
  loading?: 'eager' | 'lazy'
  minHeight?: number
}

/** Live code view */
const LiveCode: React.FC<Props> = ({ className, files, height = 240, loading: loadingProp = 'lazy', minHeight }) => {
  const eager = loadingProp === 'eager'

  const id = useId()
  const frameRef = useRef<HTMLIFrameElement>(null)
  const initialSrc = useRef(stringifyFiles(files)).current

  const [wasInView, setWasInView] = useReducer(() => true, false)
  const [loaded, setLoaded] = useReducer(() => true, false)
  const [src, setSrc] = useState(initialSrc)

  useEffect(() => {
    const handleReadyMesasge = (event: MessageEvent<string>): void => {
      if (event.data === `${id}/ready`) {
        setLoaded()
      }
    }

    window.addEventListener('message', handleReadyMesasge)

    return () => window.removeEventListener('message', handleReadyMesasge)
  }, [id])

  useEffect(() => {
    setSrc(stringifyFiles(files))
  }, [files])

  // push changes to the frame
  useEffect(() => {
    if (loaded && frameRef.current?.contentWindow) {
      frameRef.current.contentWindow.postMessage(src)
    }
  }, [loaded, src])

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
              src={`/frame?id=${id}`}
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

function stringifyFiles(files: readonly VirtualFile[]): string {
  const [css, html, js] = files.reduce(
    (acc, file) => {
      switch (file.lang) {
        case 'css':
          acc[0].push(file)
          break
        case 'html':
          acc[1].push(file)
          break
        case 'js':
          acc[2].push(file)
          break
      }

      return acc
    },
    [[], [], []] as [VirtualFile[], VirtualFile[], VirtualFile[]],
  )

  const view = html.map((file) => file.content).join('')
  const styleElements = css.map((file) => file.content).join('')
  const scripts = js.map((it) => `;(() => {${it.content}})()`).join('')

  return `<style>${styleElements}</style>${view}<script id="dynascript">${scripts}</script>`
}
