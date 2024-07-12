import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react'

import styles from './HTMLDemoImpl.module.scss'
import LiveCode from '../LiveCode'

export type HTMLDemoImplProps = {
  children: React.ReactNode
  height?: number
}

const HTMLDemoImpl: React.FC<HTMLDemoImplProps> = ({ children, height }) => {
  const rootRef = useRef<HTMLElement>(null)

  const [currentLang, setCurrentLang] = useState<'css' | 'html' | 'js'>('html')
  const [codes, setCodes] = useState<Record<'css' | 'html' | 'js', string[]>>({
    css: [],
    html: [],
    js: [],
  })

  const containsMultipleLangs = useMemo(() => Object.values(codes).filter((v) => v.length > 0).length > 1, [codes])

  useEffect(() => {
    if (rootRef.current) {
      const result: typeof codes = {
        css: [],
        html: [],
        js: [],
      }

      for (const block of rootRef.current.querySelectorAll('pre')) {
        const language = block.dataset.language as 'css' | 'html' | 'js' | undefined
        if (!language) {
          continue
        }

        result[language].push(block.textContent || '')
      }

      setCodes(result)
    }
  }, [children])

  return (
    <figure ref={rootRef} aria-label="데모" className={styles.root}>
      <LiveCode className={styles.result} files={codes} loading="eager" minHeight={height} />
      {containsMultipleLangs && (
        <div className={styles.langButtonsBar}>
          {codes.html.length > 0 && (
            <button className={styles.langButton} type="button" onClick={() => setCurrentLang('html')}>
              HTML
            </button>
          )}
          {codes.css.length > 0 && (
            <button className={styles.langButton} type="button" onClick={() => setCurrentLang('css')}>
              CSS
            </button>
          )}
          {codes.js.length > 0 && (
            <button className={styles.langButton} type="button" onClick={() => setCurrentLang('js')}>
              JavaScript
            </button>
          )}
        </div>
      )}
      <div
        className={styles.codes}
        data-lang={currentLang}
        style={{ gridArea: containsMultipleLangs ? undefined : 'span 2' }}
      >
        {children}
      </div>
    </figure>
  )
}

export default HTMLDemoImpl
