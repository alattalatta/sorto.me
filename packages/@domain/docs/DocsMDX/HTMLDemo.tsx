import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react'

import * as styles from './HTMLDemo.css'
import LiveCode from './LiveCode'

type Props = {
  children: React.ReactNode
  height?: number
}

const HTMLDemo: React.FC<Props> = ({ children: childrenProp, height }) => {
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

      for (const block of rootRef.current.querySelectorAll('code')) {
        const language = block.classList.value.match(/language-(\w+)/)?.[1] as 'css' | 'html' | 'js'
        result[language].push(block.textContent || '')
      }

      setCodes(result)
    }
  }, [childrenProp])

  const children = Children.map(childrenProp, (child) => {
    if (isValidElement(child)) {
      const { className, ...rest } = child.props as Record<string, unknown> & { className: string }
      const hidden = !className.includes(`language-${currentLang}`)

      return cloneElement(child, {
        className,
        hidden,
        ...rest,
      })
    }
    return child
  })

  return (
    <figure ref={rootRef} aria-label="데모" className={styles.root}>
      <LiveCode className={styles.result} codes={codes} loading="eager" minHeight={height} />
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
      <div className={styles.codes} style={{ gridArea: containsMultipleLangs ? undefined : 'span 2' }}>
        {children}
      </div>
    </figure>
  )
}

export default HTMLDemo
