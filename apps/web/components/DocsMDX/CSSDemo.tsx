import { styled } from '@lib/ui'
import { useEffect, useRef, useState } from 'react'

import LiveCode from './LiveCode'

type Props = {
  height?: number
  selector?: string
}

const Root = styled('aside', {
  border: '1px solid $fg',
  margin: '1.5em 0',
  padding: '1em',
  '@w2': {
    display: 'flex',
    alignItems: 'top',
  },

  '& pre': {
    cursor: 'pointer',
    margin: 0,
    position: 'relative',
    '& + &': {
      marginTop: '0.25em',
    },
    '&:hover': {
      background: '#EDF9E9',
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

const Result = styled(LiveCode, {
  width: '100%',
  border: '1px solid $fg',
  '@w2': {
    width: `${400 / 16}rem`,
    minWidth: `${400 / 16}rem`,
  },
})

const Codes = styled('div', {
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  marginTop: '1em',
  '@w2': {
    marginTop: 0,
    marginLeft: '0.5em',
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
        css: Array.from(rootRef.current.querySelectorAll('code.language-css')).map((block, index) =>
          index === currentBlockIdx ? selector.replace('$', block.textContent) : '',
        ),
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

      rootRef.current.querySelectorAll('code.language-css:not([hidden])').forEach((block, index) => {
        result.css.push(index === 0 ? selector.replace('$', block.textContent) : '')

        block.addEventListener(
          'click',
          () => {
            setCurrentBlockIdx(index)
          },
          { signal },
        )
      })

      rootRef.current.querySelectorAll('code:not(.language-css), code.language-css[hidden]').forEach((block) => {
        const language = block.classList.value.match(/language-(\w+)/)?.[1] as 'html' | 'js'
        result[language].push(block.textContent)
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
