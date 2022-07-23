import { useMounted } from '@lib/functions'
import clsx from 'clsx'
import { Children, cloneElement, isValidElement, useEffect, useReducer, useRef, useState } from 'react'

import * as styles from './CSSDemo.css'
import LiveCode from './LiveCode'

type Props = {
  children: React.ReactNode
  height?: number
  selector: string
}

const CSSDemo: React.FC<Props> = ({ children: childrenProp, height, selector }) => {
  const rootRef = useRef<HTMLElement>(null)

  const mounted = useMounted()
  const [currentBlockIdx, setCurrentBlockIdx] = useState(0)
  const [codes, setCodes] = useState<Record<'css' | 'html' | 'js', string[]>>({
    css: [],
    html: [],
    js: [],
  })

  // initializer effect
  useEffect(() => {
    if (rootRef.current) {
      const controller = new AbortController()
      const signal = controller.signal

      const result: typeof codes = {
        css: [],
        html: [],
        js: [],
      }

      rootRef.current.querySelectorAll('pre.language-css:not([hidden])').forEach((block, index) => {
        result.css.push(index === 0 ? selector.replace('$', block.textContent || '') : '')

        block.addEventListener(
          'click',
          () => {
            setCurrentBlockIdx(index)
          },
          { signal },
        )
      })

      rootRef.current.querySelectorAll('pre:not(.language-css), pre.language-css[hidden]').forEach((block) => {
        const language = block.classList.value.match(/language-(\w+)/)?.[1] as 'html' | 'js'
        result[language].push(block.textContent || '')
      })

      setCodes(result)

      return () => controller.abort()
    }
  }, [selector])

  // interaction effect
  useEffect(() => {
    if (mounted && rootRef.current) {
      setCodes({
        ...codes,
        css: Array.from(rootRef.current.querySelectorAll('pre.language-css')).map((block, index) => {
          if (block.attributes.getNamedItem('hidden')) {
            return block.textContent || ''
          }

          return index === currentBlockIdx ? selector.replace('$', block.textContent || '') : ''
        }),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, currentBlockIdx, selector])

  const children = Children.map(childrenProp, (child, index) => {
    if (isValidElement(child)) {
      const { className, ...rest } = child.props as Record<string, unknown> & { className: string }

      const hidden = !className.includes('language-css')

      return cloneElement(child, {
        className: clsx(className, currentBlockIdx === index && 'selected'),
        hidden,
        ...rest,
      })
    }
    return child
  })

  return (
    <figure ref={rootRef} aria-label="데모" className={styles.root}>
      <LiveCode className={styles.result} codes={codes} loading="eager" minHeight={height} />
      <div className={styles.codes}>{children}</div>
    </figure>
  )
}

export default CSSDemo
