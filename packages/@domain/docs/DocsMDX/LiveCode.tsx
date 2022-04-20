import clsx from 'clsx'
import { useEffect, useReducer, useRef, useState } from 'react'

import * as styles from './LiveCode.css'

type Language = 'css' | 'html' | 'js'

type Props = {
  className?: string
  codes: Record<Language, readonly string[]>
  height?: number
  light?: boolean
  loading?: 'eager' | 'lazy'
  minHeight?: number
}

const LiveCode: React.FC<Props> = ({
  className,
  codes: { css, html, js },
  height,
  loading: loadingProp = 'lazy',
  light,
  minHeight,
}) => {
  const eager = loadingProp === 'eager'

  const rootRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const initialSrc = useRef(serializeSrc(css, html, js)).current

  const [intersected, setIntersected] = useReducer(() => true, eager) // skip intersection check when eager
  const [loaded, setLoaded] = useReducer(() => true, false)
  const [src, setSrc] = useState(initialSrc)

  useEffect(() => {
    setSrc(serializeSrc(css, html, js))
  }, [css, html, js])

  useEffect(() => {
    if (eager) {
      return
    }

    if (rootRef.current) {
      const observer = new IntersectionObserver(
        ([target]) => {
          if (target.isIntersecting) {
            setIntersected()
            observer.disconnect()
          }
        },
        { threshold: 0.5 },
      )
      observer.observe(rootRef.current)

      return () => observer.disconnect()
    }
  }, [eager])

  useEffect(() => {
    if (loaded && frameRef.current?.contentWindow) {
      frameRef.current.contentWindow.postMessage(src)
    }
  }, [loaded, src])

  const loading = !eager && !loaded

  return (
    <div ref={rootRef} className={clsx(styles.root, className)} style={{ height: height, minHeight: minHeight }}>
      {intersected && (
        <iframe
          ref={frameRef}
          className={styles.frame({ loading })}
          src={`/frame${light ? '?forceLightTheme' : ''}`}
          title="예제"
          onLoad={setLoaded}
        />
      )}
      <p className={styles.loadingMessage({ loading })}>
        <span className={styles.spinner} />
        불러오는 중...
      </p>
    </div>
  )
}

export default LiveCode
export type { Language }

function serializeSrc(css: readonly string[], html: readonly string[], js: readonly string[]): string {
  const view = html.join('')
  const styleElements = css.filter(Boolean).join('')
  const scripts = js
    .filter(Boolean)
    .map((it) => `;(() => {${it}})()`)
    .join('')

  return `<style>${styleElements}</style>${view}<script id="dynascript">${scripts}</script>`
}
