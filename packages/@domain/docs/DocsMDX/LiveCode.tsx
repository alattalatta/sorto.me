import clsx from 'clsx'
import { useEffect, useReducer, useRef, useState } from 'react'

import * as styles from './LiveCode.css'

type Language = 'css' | 'html' | 'js'

type Props = {
  className?: string
  codes: Record<Language, readonly string[]>
  height?: number
  light?: boolean
  minHeight?: number
}

const LiveCode: React.FC<Props> = ({ className, codes: { css, html, js }, height, light, minHeight }) => {
  const rootRef = useRef<HTMLIFrameElement>(null)
  const initialSrc = useRef(serializeSrc(css, html, js)).current

  const [loaded, setLoaded] = useReducer(() => true, false)
  const [src, setSrc] = useState(initialSrc)

  useEffect(() => {
    setSrc(serializeSrc(css, html, js))
  }, [css, html, js])

  useEffect(() => {
    if (loaded && rootRef.current?.contentWindow) {
      rootRef.current.contentWindow.postMessage(src)
    }
  }, [loaded, src])

  return (
    <div className={clsx(styles.root, className)} style={{ height: height, minHeight: minHeight }}>
      <iframe
        ref={rootRef}
        className={styles.frame({ loading: !loaded })}
        src={`/frame${light ? '?forceLightTheme' : ''}`}
        title="예제"
        onLoad={setLoaded}
      />
      <p className={styles.loadingMessage({ loading: !loaded })}>
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
  const styleElements = css
    .filter(Boolean)
    .map((it) => `<style>${it}</style>`)
    .join('')
  const scriptElements = js
    .filter(Boolean)
    .map((it) => `<script>${it}</script>`)
    .join('')

  return `${styleElements}${view}${scriptElements}`
}
