import { eq, set } from 'fp-ts'
import { useCallback, useState } from 'react'

import { setupContext } from 'utils/setupContext'

type Language = 'css' | 'html' | 'js'
type CodeBlocks = Record<'main' | 'sub', Record<Language, Set<HTMLElement>>>

type CodeBlockDispatch = (main: boolean, language: Language, element: HTMLElement) => void
type CodeBlockDispatchers = {
  register: CodeBlockDispatch
  unregister: CodeBlockDispatch
}

const eqElement = eq.eqStrict as eq.Eq<HTMLElement>
const insertElement = set.insert(eqElement)
const removeElement = set.remove(eqElement)

const assignBlock = (
  category: 'main' | 'sub',
  language: Language,
  newSet: Set<HTMLElement>,
  codeBlocks: CodeBlocks,
): CodeBlocks => {
  return {
    ...codeBlocks,
    [category]: {
      ...codeBlocks[category],
      [language]: newSet,
    },
  }
}

const [DemoCodeBlockDispatchProvider, useDemoCodeBlockDispatch] =
  setupContext<CodeBlockDispatchers>('DemoCodeBlockDispatch')
const [DemoCodeBlocksProvider, useDemoCodeBlocks] = setupContext<CodeBlocks>('DemoCodeBlocks')

const DemoProvider: React.FC = ({ children }) => {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlocks>({
    main: { css: new Set(), html: new Set(), js: new Set() },
    sub: { css: new Set(), html: new Set(), js: new Set() },
  })

  const addCodeBlock: CodeBlockDispatch = useCallback((main, language, element) => {
    setCodeBlocks((prevCodeBlocks) => {
      const category = main ? 'main' : 'sub'
      const newSet = insertElement(element)(prevCodeBlocks[category][language])

      return assignBlock(category, language, newSet, prevCodeBlocks)
    })
  }, [])

  const removeCodeBlock: CodeBlockDispatch = useCallback((main, language, element) => {
    setCodeBlocks((prevCodeBlocks) => {
      const category = main ? 'main' : 'sub'
      const newSet = removeElement(element)(prevCodeBlocks[category][language])

      return assignBlock(category, language, newSet, prevCodeBlocks)
    })
  }, [])

  return (
    <DemoCodeBlockDispatchProvider register={addCodeBlock} unregister={removeCodeBlock}>
      <DemoCodeBlocksProvider {...codeBlocks}>{children}</DemoCodeBlocksProvider>
    </DemoCodeBlockDispatchProvider>
  )
}

export { DemoProvider as Root, useDemoCodeBlockDispatch as useDispatch, useDemoCodeBlocks as useCodeBlocks }
export type { Language, CodeBlocks }
