import { styled } from '@lib/ui'
import { useEffect, useRef, useState } from 'react'

import LiveCode from './LiveCode'

type Props = {
  height?: number
  selector: string
}

const Root = styled('figure', {
  background: '$bgInv',
  borderRadius: '.25rem',
  display: 'grid',
  gap: '.25rem',
  gridTemplateAreas: `
    'result'
    'code'
  `,
  margin: '1.5rem 0',
  padding: '1em',
  '@w2': {
    gridTemplateAreas: `
      'code result'
    `,
    gridTemplateColumns: `1fr ${400 / 16}rem`,
  },

  '$stx-keyword': '#18c498',
  '$stx-string': '#257dff',
  '$stx-tag': '#ff7037',
})

const Result = styled(LiveCode, {
  width: '100%',
  height: '100%',
  borderRadius: '.25rem .25rem 0 0',
  gridArea: 'result',
  '@w2': {
    borderRadius: '0 .25rem .25rem 0',
  },
})

const Codes = styled('div', {
  borderRadius: '0 0 .25rem .25rem',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '@w2': {
    borderRadius: '.25rem 0 0 .25rem',
  },

  '& pre': {
    background: '$bgSupplInv',
    color: '$fgInv',
    cursor: 'pointer',
    margin: 0,
    position: 'relative',
    '& + &': {
      marginTop: '0.25rem',
    },
    '&::after': {
      content: '✔️',
      display: 'none',
      fontSize: '1.5em',
      position: 'absolute',
      top: '.25em',
      right: '.25em',
    },
  },
  '& pre:not(.language-css)': {
    display: 'none',
  },
})

const CSSDemo: React.FC<Props> = ({ children, height, selector }) => {
  const rootRef = useRef<HTMLElement>(null)

  const [currentBlockIdx, setCurrentBlockIdx] = useState(0)
  const [codes, setCodes] = useState<Record<'css' | 'html' | 'js', string[]>>({
    css: [],
    html: [],
    js: [],
  })

  useEffect(() => {
    if (rootRef.current) {
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
  }, [currentBlockIdx, selector])

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

  return (
    <Root ref={rootRef} aria-label="데모">
      <Result codes={codes} height={height} />
      <Codes css={{ [`& > pre:nth-child(${currentBlockIdx + 1})::after`]: { display: 'block' } }}>{children}</Codes>
    </Root>
  )
}

export default CSSDemo
