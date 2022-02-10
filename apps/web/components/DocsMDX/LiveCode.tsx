import { useMemo } from 'react'

type Language = 'css' | 'html' | 'js'

type Props = {
  className?: string
  codes: Record<Language, readonly string[]>
  height?: number
}

const LiveCode: React.VFC<Props> = ({ className, codes: { css, html, js }, height }) => {
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

    return `<html><head><link rel="stylesheet" href="/frame/frame.css">${styleElements}</head><body>${view}${scriptElements}</body></html>`
  }, [css, html, js])

  return notFound ? (
    <div className={className} style={{ height: height && `${height}px` }} />
  ) : (
    <iframe className={className} height={height} srcDoc={srcDoc} title="예제" />
  )
}

export default LiveCode
export type { Language }
