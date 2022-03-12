import clsx from 'clsx'
import { useMemo } from 'react'

import * as styles from './LiveCode.css'

type Language = 'css' | 'html' | 'js'

type Props = {
  className?: string
  codes: Record<Language, readonly string[]>
  height?: number
  minHeight?: number
}

const LiveCode: React.VFC<Props> = ({ className, codes: { css, html, js }, height, minHeight }) => {
  const notFound = !(css.length || html.length || js.length) // when everything is empty

  const srcDoc = useMemo(() => {
    const view = html.join('\n')
    const styleElements = css
      .filter(Boolean)
      .map((it) => `<style>${it}</style>`)
      .join('')
    const scriptElements = js
      .filter(Boolean)
      .map((it) => `<script>${it}</script>`)
      .join('')

    // [todo] window.addEventListener('message', updateSource)
    return `<html><head><link rel="stylesheet" href="/frame/frame.css">${styleElements}</head><body>${view}${scriptElements}</body></html>`
  }, [css, html, js])

  return notFound ? (
    <div className={clsx(styles.root, className)} style={{ height: height, minHeight: minHeight }} />
  ) : (
    <iframe
      className={clsx(styles.root, className)}
      srcDoc={srcDoc}
      style={{ height: height, minHeight: minHeight }}
      title="예제"
    />
  )
}

export default LiveCode
export type { Language }
