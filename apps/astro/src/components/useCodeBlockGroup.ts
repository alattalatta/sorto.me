import { useCallback, useEffect, useState } from 'react'

import { useMounted } from './useMounted'

export type Lang = 'css' | 'html' | 'js'
export type VirtualFile = {
  content: string
  editable: boolean
  lang: Lang
  name: string
}

export type VirtualFilesUsage = {
  files: readonly VirtualFile[] | null
  updateFile: (file: VirtualFile) => void
}

export function useCodeBlockGroup(groupName: string): VirtualFilesUsage {
  const [css, setCSS] = useState<Record<string, VirtualFile>>({})
  const [html, setHTML] = useState<Record<string, VirtualFile>>({})
  const [js, setJS] = useState<Record<string, VirtualFile>>({})

  const mounted = useMounted()

  useEffect(() => {
    setHTML(getVirtualFilesFromCodeBlocks(groupName, 'html'))
    setJS(getVirtualFilesFromCodeBlocks(groupName, 'js'))
    setCSS(getVirtualFilesFromCodeBlocks(groupName, 'css'))
  }, [groupName])

  const updateFile = useCallback(({ content, lang, name }: VirtualFile) => {
    // ineditable files can't be updated
    switch (lang) {
      case 'css':
        setCSS((prev) => ({ ...prev, [name]: { content, lang, name, editable: true } }))
        break
      case 'html':
        setHTML((prev) => ({ ...prev, [name]: { content, lang, name, editable: true } }))
        break
      case 'js':
        setJS((prev) => ({ ...prev, [name]: { content, lang, name, editable: true } }))
        break
    }
  }, [])

  return {
    files: mounted ? [...Object.values(html), ...Object.values(js), ...Object.values(css)] : null,
    updateFile,
  }
}

function getVirtualFilesFromCodeBlocks(groupName: string, lang: Lang): Record<string, VirtualFile> {
  const dataIDSelector = `[data-name=${groupName}]`
  const selector = `${dataIDSelector} > pre[data-language=${lang}]`

  return Object.fromEntries(
    Array.from(document.querySelectorAll(selector))
      .map((block) => {
        const filename = `${block.parentElement?.dataset.filename ?? 'index'}.${lang}`
        const editable = (block.parentElement?.dataset.editable ?? 'true') === 'true'

        return [
          filename,
          {
            content: block.textContent,
            editable,
            lang,
            name: filename,
          },
        ] as const
      })
      .filter((fileEntry): fileEntry is [string, VirtualFile] => Boolean(fileEntry[1].content && fileEntry[1].name)),
  )
}
