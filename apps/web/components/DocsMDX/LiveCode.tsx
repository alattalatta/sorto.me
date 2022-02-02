import { useMemo } from 'react'

type Language = 'css' | 'html' | 'js'

type Props = {
  className?: string
  height?: number
} & Record<Language, readonly string[]>

const LiveCode: React.VFC<Props> = ({ className, css, height, html, js }) => {
  const notFound = !(css.length || html.length || js.length)

  const srcDoc = useMemo(() => {
    const view = html.join('\n')
    const styleElements = css.map((it) => `<style>${it}</style>`).join('')
    const scriptElements = js.map((it) => `<script>${it}</script>`).join('')

    return `<html><head><link rel="stylesheet" href="/frame/frame.css">${styleElements}</head><body>${view}${scriptElements}</body></html>`
  }, [css, html, js])

  return notFound ? (
    <div className={className} style={{ height: `${height}px` }} />
  ) : (
    <iframe className={className} height={height} srcDoc={srcDoc} title="예제" />
  )
}

export default LiveCode
export type { Language }
