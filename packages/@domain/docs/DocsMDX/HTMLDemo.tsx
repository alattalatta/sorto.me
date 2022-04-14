import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'

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
  }, [])

  const children = Children.map(childrenProp, (child) => {
    if (isValidElement(child)) {
      const {
        props: { className, ...props },
      } = child
      const hidden = !className.includes(`language-${currentLang}`)

      return cloneElement(child, {
        className,
        hidden,
        ...props,
      })
    }
    return child
  })

  return (
    <figure ref={rootRef} aria-label="데모" className={styles.root}>
      <LiveCode className={styles.result} codes={codes} minHeight={height} />
      <div className={styles.langButtonsBar}>
        {Boolean(codes.html.length) && (
          <button className={styles.langButton} type="button" onClick={() => setCurrentLang('html')}>
            HTML
          </button>
        )}
        {Boolean(codes.css.length) && (
          <button className={styles.langButton} type="button" onClick={() => setCurrentLang('css')}>
            CSS
          </button>
        )}
        {Boolean(codes.js.length) && (
          <button className={styles.langButton} type="button" onClick={() => setCurrentLang('js')}>
            JavaScript
          </button>
        )}
      </div>
      <div className={styles.codes}>{children}</div>
    </figure>
  )
}

export default HTMLDemo
