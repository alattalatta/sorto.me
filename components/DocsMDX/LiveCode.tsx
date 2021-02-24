import { motion as m } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  height?: number
  name: string
  title?: string
}
export type LiveCodeProps = Props

const LiveCode: React.VFC<Props> = ({ height, name, title }) => {
  const [htmlTexts, setHTML] = useState<string[]>([])
  const [scriptTexts, setScript] = useState<string[]>([])
  const [styleTexts, setStyle] = useState<string[]>([])

  useEffect(() => {
    setHTML(selectLanguageBlockContents('html'))
    setScript(selectLanguageBlockContents('js'))
    setStyle(selectLanguageBlockContents('css'))
  }, [])

  const notFound = !(htmlTexts.length || scriptTexts.length || styleTexts.length)

  return notFound ? (
    <div style={{ height: `${height}px` }} />
  ) : (
    <m.iframe height={height} srcDoc={buildHTML()} title={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
  )

  function selectLanguageBlockContents(lang: 'css' | 'html' | 'js'): string[] {
    const dataIDSelector = `[data-codeblock-name=${name}]`
    const selector = `code${dataIDSelector}[class~="language-${lang}"]`

    return Array.from(document.querySelectorAll(selector))
      .map((block) => block.textContent)
      .filter(Boolean) as string[]
  }

  function buildHTML(): string {
    const scriptElements = scriptTexts.map((it) => `<script>${it}</script>`).join('')
    const styleElements = styleTexts.map((it) => `<style>${it}</style>`).join('')
    const view = htmlTexts.join('\n')

    return `<html><head><link rel="stylesheet" href="/frame/frame.css">${scriptElements}${styleElements}</head><body>${view}</body></html>`
  }
}

export default LiveCode
