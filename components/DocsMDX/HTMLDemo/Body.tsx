import { record } from 'fp-ts'
import { useMemo, useState } from 'react'

import { css, styled } from 'utils/styler'

import * as DemoProvider from '../DemoProvider'
import LiveCode from '../LiveCode'
import LanguageChoice from './LanguageChoice'

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
    display: 'none',
    margin: 0,
  },
  variants: {
    language: {
      css: {
        '& > pre[class~="language-css"]': {
          display: 'block',
        },
      },
      html: {
        '& > [class~="language-html"]': {
          display: 'block',
        },
      },
      js: {
        '& > [class~="language-js"]': {
          display: 'block',
        },
      },
    },
  },
  defaultVariants: {
    language: 'html',
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
  },
})

const grabInnerText = (elSet: Set<HTMLElement>) => Array.from(elSet.values()).map((el) => el.innerText)
const grabCodeBlocksInnerTexts = record.map(grabInnerText)

const HTMLDemoBody: React.FC<{ height?: number }> = ({ children, height }) => {
  const codeBlocks = DemoProvider.useCodeBlocks()
  const [activeLanguage, setActiveLanguage] = useState<DemoProvider.Language>('html')

  if (!codeBlocks) {
    throw new Error("HTMLDemoBody couldn't find DemoProvider.")
  }

  const stringifiedCodeBlocks = useMemo(() => grabCodeBlocksInnerTexts(codeBlocks), [codeBlocks])

  return (
    <Root aria-label="데모">
      <Codes language={activeLanguage}>
        <LanguageChoice codeBlocks={codeBlocks} onChange={setActiveLanguage} />
        {children}
      </Codes>
      <Result>
        <LiveCode height={height} {...stringifiedCodeBlocks} />
      </Result>
    </Root>
  )
}

export default HTMLDemoBody
