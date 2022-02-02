import { useMemo, useState } from 'react'

import { css, styled } from 'utils/styler'

import * as DemoProvider from '../DemoProvider'
import { codeBlockSemigroup } from '../DemoProvider/types'
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
  '@narrow': {
    paddingRight: 0,
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
    minWidth: 0,
    marginTop: 16,
  },
})

const frameStyler = (height?: number) =>
  css({
    height: '100%',
    minHeight: height,
  })

const HTMLDemoBody: React.FC<{ height?: number }> = ({ children, height }) => {
  const codeStrings = DemoProvider.useCodeStrings()
  const [activeLanguage, setActiveLanguage] = useState<DemoProvider.Language>('html')

  if (!codeStrings) {
    throw new Error(`Couldn't find DemoProvider`)
  }

  const frameStyle = useMemo(() => frameStyler(height)(), [height])
  const stringifiedCodeBlocks = useMemo(() => {
    return codeBlockSemigroup.concat(codeStrings.main, codeStrings.sub)
  }, [codeStrings])

  return (
    <Root aria-label="데모">
      <Codes language={activeLanguage}>
        <LanguageChoice codeStrings={codeStrings.main} onChange={setActiveLanguage} />
        {children}
      </Codes>
      <Result>
        <LiveCode className={frameStyle} height={height} {...stringifiedCodeBlocks} />
      </Result>
    </Root>
  )
}

export default HTMLDemoBody
