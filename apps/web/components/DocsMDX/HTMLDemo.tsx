import { styled } from '@lib/ui'
import { useEffect, useRef, useState } from 'react'

import LiveCode from './LiveCode'

const Root = styled('figure', {
  background: '$bgInv',
  borderRadius: '.25rem',
  display: 'grid',
  gap: '.25rem',
  gridTemplateAreas: `
    'result'
    'code'
    'languages'
  `,
  margin: '1.5rem 0',
  padding: '1rem',
  '@w2': {
    gridTemplateAreas: `
      'languages result'
      'code      result'
    `,
    gridTemplateColumns: `1fr ${400 / 16}rem`,
    gridTemplateRows: `${44 / 16}rem 1fr`,
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
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gridArea: 'code',

  '& pre': {
    background: '$bgSupplInv',
    color: '$fgInv',
    display: 'none',
    margin: 0,
  },

  variants: {
    language: {
      css: {
        '& pre.language-css': {
          display: 'block',
        },
      },
      html: {
        '& pre.language-html': {
          display: 'block',
        },
      },
      js: {
        '& pre.language-js': {
          display: 'block',
        },
      },
    },
  },
})

const LangButtonBar = styled('div', {
  display: 'flex',
  borderRadius: '0 0 .25rem .25rem',
  gap: '.25rem',
  gridArea: 'languages',
  overflow: 'hidden',
})

const LangButton = styled('button', {
  height: `${44 / 16}rem`,
  background: '$bgSupplInv',
  border: 'none',
  color: '$fgInv',
  flexGrow: 1,
  fontSize: `${14 / 16}rem`,
})

const HTMLDemo: React.FC<{ height?: number }> = ({ children, height }) => {
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
        result[language].push(block.textContent)
      }

      setCodes(result)
    }
  }, [])

  return (
    <Root ref={rootRef} aria-label="데모">
      <Result codes={codes} css={{ minHeight: height }} />
      <LangButtonBar>
        {Boolean(codes.html.length) && <LangButton onClick={() => setCurrentLang('html')}>HTML</LangButton>}
        {Boolean(codes.css.length) && <LangButton onClick={() => setCurrentLang('css')}>CSS</LangButton>}
        {Boolean(codes.js.length) && <LangButton onClick={() => setCurrentLang('js')}>JavaScript</LangButton>}
      </LangButtonBar>
      <Codes language={currentLang}>{children}</Codes>
    </Root>
  )
}

export default HTMLDemo
