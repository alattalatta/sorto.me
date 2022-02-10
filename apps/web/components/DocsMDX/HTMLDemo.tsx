import { styled } from '@app/ui'
import { useEffect, useRef, useState } from 'react'

import LiveCode from './LiveCode'

const Root = styled('aside', {
  border: '1px solid #2c2c2c',
  margin: '1.5em 0',
  padding: '1em',
  '@w2': {
    display: 'flex',
    alignItems: 'top',
  },

  '& pre': {
    borderLeft: 'none',
    display: 'none',
    margin: '0.25em 0 0',
  },
})

const Result = styled(LiveCode, {
  width: '100%',
  border: '1px solid #2c2c2c',
  '@w2': {
    width: `${400 / 16}em`,
    minWidth: `${400 / 16}em`,
  },
})

const Codes = styled('div', {
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  marginTop: '1em',
  '@w2': {
    flexDirection: 'column-reverse',
    marginTop: 0,
    marginLeft: '0.5em',
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
  marginTop: '0.25em',
  '@w2': {
    marginTop: 0,
  },
})

const LangButton = styled('button', {
  height: `${44 / 14}em`,
  background: '#f2f2f2',
  border: 'none',
  flexGrow: 1,
  fontSize: `${14 / 16}em`,
  '& + &': {
    borderLeft: '1px solid #ccc',
  },
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
      <Result codes={codes} height={height} />
      <Codes language={currentLang}>
        {children}
        <LangButtonBar>
          {Boolean(codes.html.length) && <LangButton onClick={() => setCurrentLang('html')}>HTML</LangButton>}
          {Boolean(codes.css.length) && <LangButton onClick={() => setCurrentLang('css')}>CSS</LangButton>}
          {Boolean(codes.js.length) && <LangButton onClick={() => setCurrentLang('js')}>JavaScript</LangButton>}
        </LangButtonBar>
      </Codes>
    </Root>
  )
}

export default HTMLDemo
