import { useEffect, useState } from 'react'

export type Lang = 'css' | 'html' | 'js'

export function useCodeBlockGroup(name: string): Record<Lang, string[]> {
  const [htmlTexts, setHTMLTexts] = useState<string[]>([])
  const [scriptTexts, setScriptTexts] = useState<string[]>([])
  const [styleTexts, setStyleTexts] = useState<string[]>([])

  useEffect(() => {
    setHTMLTexts(getSubLanguageBlocksText(name, 'html'))
    setScriptTexts(getSubLanguageBlocksText(name, 'js'))
    setStyleTexts(getSubLanguageBlocksText(name, 'css'))
  }, [name])

  return {
    css: styleTexts,
    html: htmlTexts,
    js: scriptTexts,
  }
}

function getSubLanguageBlocksText(name: string, lang: Lang): string[] {
  const dataIDSelector = `[data-name=${name}]`
  const selector = `${dataIDSelector} > pre[data-language=${lang}]`

  return Array.from(document.querySelectorAll(selector))
    .map((block) => block.textContent)
    .filter(Boolean) as string[]
}
