import { useEffect, useMemo, useRef, useState } from 'react'

import { css, styled } from 'utils/styler'

import * as DemoProvider from '../DemoProvider'
import { codeBlockSemigroup } from '../DemoProvider/types'
import LiveCode from '../LiveCode'

const Root = styled('aside', {
  background: '#eee',
  border: '1px solid $base70',
  borderRadius: '$cornerRadius',
  display: 'flex',
  padding: '16px',
  '@narrow': {
    display: 'block',
  },
})

const Codes = styled('div', {
  minWidth: 0,
  flexGrow: 1,
  paddingRight: 16,
  '& > pre': {
    cursor: 'pointer',
    margin: 0,
  },
  '& > pre + pre': {
    marginTop: 8,
  },
  '& > pre:not([class~="language-css"])': {
    display: 'none',
  },
  '& code[data-active="false"]:hover': {
    borderColor: '$base60',
  },
  '& code[data-active="true"]': {
    borderColor: '#7fbf7f',
  },
  '& code[data-active="true"]::after': {
    content: '✔️',
    position: 'absolute',
    top: 8,
    right: 8,
  },
  '@narrow': {
    paddingRight: 0,
  },
})

const Result = styled('div', {
  width: 420,
  minWidth: 420,
  background: '#fff',
  border: '16px solid #fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  flexShrink: 0,
  '@narrow': {
    width: '100%',
    minWidth: 0,
    marginTop: 16,
  },
})

const frameStyler = (height?: number) =>
  css({
    height: '100%',
    minHeight: height,
  })

const CODE_SELECTOR = 'pre[class~="language-css"] code'

const CSSDemoBody: React.FC<{ height?: number; selector?: string }> = ({ children, height, selector }) => {
  const codes = useRef<HTMLDivElement>(null)

  const codeStrings = DemoProvider.useCodeStrings()
  const [activeChoice, setActiveChoice] = useState(0)

  if (!codeStrings) {
    throw new Error(`Couldn't find DemoProvider`)
  }

  const frameStyle = useMemo(() => frameStyler(height)(), [height])
  const stringifiedCodeBlocks = useMemo(() => {
    const activeStyleString = codeStrings.main.css[activeChoice]
    const mainStyleString = selector ? selector.replace('$', activeStyleString) : activeStyleString

    return codeBlockSemigroup.concat({ ...codeStrings.main, css: [mainStyleString] }, codeStrings.sub)
  }, [activeChoice, codeStrings, selector])

  useEffect(() => {
    if (!codes.current) {
      return
    }

    Array.from(codes.current.querySelectorAll<HTMLPreElement>(CODE_SELECTOR)).forEach((codeBlock, index) => {
      codeBlock.setAttribute('aria-checked', String(index === 0))
      codeBlock.dataset['active'] = String(index === 0)
    })
  }, [])

  useEffect(() => {
    if (!codes.current) {
      return
    }

    const cssCodes = Array.from(codes.current.querySelectorAll<HTMLPreElement>(CODE_SELECTOR))

    const blockHandlerSets = cssCodes.map((codeBlock, index) => {
      const clickHandler = (): void => {
        cssCodes.forEach((it, i) => {
          it.setAttribute('aria-checked', String(i === index))
          it.dataset['active'] = String(i === index)
        })
        setActiveChoice(index)
      }
      codeBlock.addEventListener('click', clickHandler)

      return [codeBlock, clickHandler] as const
    })

    return () => {
      blockHandlerSets.forEach(([codeBlock, clickHandler]) => {
        codeBlock.removeEventListener('click', clickHandler)
      })
    }
  }, [children])

  return (
    <Root aria-label="데모">
      <Codes ref={codes}>{children}</Codes>
      <Result>
        <LiveCode className={frameStyle} height={height} {...stringifiedCodeBlocks} />
      </Result>
    </Root>
  )
}

export default CSSDemoBody
