import { eq, set } from 'fp-ts'
import { useCallback, useState } from 'react'

import { setupContext } from 'utils/setupContext'

type Language = 'css' | 'html' | 'js'
type CodeBlocks = Record<Language, Set<HTMLElement>>

type CodeBlockDispatch = (language: Language, element: HTMLElement) => void
type CodeBlockDispatchers = {
  register: CodeBlockDispatch
  unregister: CodeBlockDispatch
}

const eqElement = eq.eqStrict as eq.Eq<HTMLElement>
const insertElement = set.insert(eqElement)
const removeElement = set.remove(eqElement)

const [DemoCodeBlockDispatchProvider, useDemoCodeBlockDispatch] =
  setupContext<CodeBlockDispatchers>('DemoCodeBlockDispatch')
const [DemoCodeBlocksProvider, useDemoCodeBlocks] = setupContext<CodeBlocks>('DemoCodeBlocks')

const DemoProvider: React.FC = ({ children }) => {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlocks>({
    css: new Set(),
    html: new Set(),
    js: new Set(),
  })

  const addCodeBlock: CodeBlockDispatch = useCallback((language, element) => {
    setCodeBlocks((prevVal) => ({ ...prevVal, [language]: insertElement(element)(prevVal[language]) }))
  }, [])

  const removeCodeBlock: CodeBlockDispatch = useCallback((language, element) => {
    setCodeBlocks((prevVal) => ({ ...prevVal, [language]: removeElement(element)(prevVal[language]) }))
  }, [])

  return (
    <DemoCodeBlockDispatchProvider register={addCodeBlock} unregister={removeCodeBlock}>
      <DemoCodeBlocksProvider {...codeBlocks}>{children}</DemoCodeBlocksProvider>
    </DemoCodeBlockDispatchProvider>
  )
}

export { DemoProvider as Root, useDemoCodeBlockDispatch as useDispatch, useDemoCodeBlocks as useCodeBlocks }
export type { Language, CodeBlocks }
