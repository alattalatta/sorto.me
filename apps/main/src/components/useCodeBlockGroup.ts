import { useCallback, useEffect, useMemo, useState } from 'react'

import { useMounted } from './useMounted'

export type Lang = 'css' | 'html' | 'js'
export type VirtualFile = {
  /** editable body */
  content: string
  editable: boolean
  /** uneditable prependers */
  frontparts: readonly string[]
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

  const updateFile = useCallback(({ content, lang, name, ...file }: VirtualFile) => {
    // ineditable files can't be updated
    switch (lang) {
      case 'css':
        setCSS((prev) => ({ ...prev, [name]: { content, lang, name, ...file } }))
        break
      case 'html':
        setHTML((prev) => ({ ...prev, [name]: { content, lang, name, ...file } }))
        break
      case 'js':
        setJS((prev) => ({ ...prev, [name]: { content, lang, name, ...file } }))
        break
    }
  }, [])

  const files = useMemo(() => {
    if (!mounted) return null

    return [...Object.values(html), ...Object.values(js), ...Object.values(css)]
  }, [mounted, html, js, css])

  return {
    files,
    updateFile,
  }
}

function getVirtualFilesFromCodeBlocks(groupName: string, lang: Lang): Record<string, VirtualFile> {
  const dataIDSelector = `[data-name=${groupName}]`
  const selector = `${dataIDSelector} > pre[data-language=${lang}]`

  return Array.from(document.querySelectorAll(selector))
    .map((block) => {
      const filename = `${groupName}/${block.parentElement?.dataset.filename ?? 'index'}.${lang}`
      const editable = (block.parentElement?.dataset.editable ?? 'true') === 'true'

      return [
        filename,
        {
          content: block.textContent,
          editable,
          frontparts: [] as readonly string[],
          lang,
          name: filename,
        },
      ] as const
    })
    .filter((fileEntry): fileEntry is [string, VirtualFile] => Boolean(fileEntry[1].content && fileEntry[1].name))
    .reduce(
      (acc, [filename, file]) => {
        if (acc[filename]) {
          acc[filename] = {
            ...acc[filename],
            ...file,
            content: file.content,
            frontparts: [...acc[filename].frontparts, acc[filename].content],
          }
        } else {
          acc[filename] = file
        }
        return acc
      },
      {} as Record<string, VirtualFile>,
    )
}
