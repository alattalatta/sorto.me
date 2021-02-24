import { motion as m } from 'framer-motion'

type Props = {
  data: {
    htmls: string[]
    scripts: string[]
    styles: string[]
  }
  height?: number
}

const LiveCode: React.VFC<Props> = ({ data: { htmls, scripts, styles }, height }) => {
  const notFound = !(htmls.length || scripts.length || styles.length)

  return notFound ? (
    <div style={{ height: `${height}px` }} />
  ) : (
    <m.iframe height={height} srcDoc={buildHTML()} title="예제" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
  )

  function buildHTML(): string {
    const scriptElements = scripts.map((it) => `<script>${it}</script>`).join('')
    const styleElements = styles.map((it) => `<style>${it}</style>`).join('')
    const view = htmls.join('\n')

    return `<html><head><link rel="stylesheet" href="/frame/frame.css">${scriptElements}${styleElements}</head><body>${view}</body></html>`
  }
}

export default LiveCode
