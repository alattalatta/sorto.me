import type babel from '@babel/standalone'
import { useEffect, useRef } from 'react'

import styles from './FrameRenderer.module.scss'
import type { VirtualFile } from './useCodeBlockGroup'

declare const window: Window & {
  Babel: typeof babel
}

const FrameRenderer: React.FC<{ babel?: boolean }> = ({ babel }) => {
  const $root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id') ?? ''

    window.parent.postMessage(`${id}/ready`)

    const handleMessage = (event: MessageEvent<VirtualFile[]>): void => {
      if (!$root.current) {
        return
      }

      $root.current.innerHTML = ''

      const { css, html, js } = event.data.reduce(
        (acc, file) => {
          acc[file.lang].push(file)
          return acc
        },
        { css: [] as VirtualFile[], html: [] as VirtualFile[], js: [] as VirtualFile[] },
      )

      for (const file of css) {
        const style = document.createElement('style')
        style.dataset.name = file.name
        style.textContent = file.frontparts.join('\n') + `\n${file.content}`
        $root.current.appendChild(style)
      }

      $root.current.insertAdjacentHTML(
        'beforeend',
        html.map((htmlFile) => htmlFile.frontparts.join('') + htmlFile.content).join(''),
      )

      for (const file of js) {
        document.querySelector(`script[data-name="${file.name}"]`)?.remove()

        const content = file.frontparts.join(';\n') + `;\n${file.content}`

        const script = document.createElement('script')
        script.dataset.name = file.name
        script.textContent = babel ? (window.Babel.transform(content, { presets: ['react'] }).code ?? '') : content
        script.type = 'module'
        document.body.appendChild(script)
      }
    }
    window.addEventListener('message', handleMessage)

    return () => window.removeEventListener('message', handleMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={$root} className={styles.root} />
}

export default FrameRenderer
