import { eq, record, readonlyArray, semigroup, set } from 'fp-ts'
import { useCallback, useMemo, useState } from 'react'

import { setupContext } from 'utils/setupContext'

import { CodeBlockDispatch, CodeBlockDispatchers, CodeBlocks, CodeStrings, Language } from './types'

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
const [DemoCodeStringsProvider, useDemoCodeStrings] = setupContext<CodeStrings>('DemoCodeStrings')

const grabInnerText = (elSet: Set<HTMLElement>) => Array.from(elSet.values()).map((el) => el.innerText)
const grabCodeBlocksInnerTexts = record.map(grabInnerText)

const stringArraySemigroup = readonlyArray.getSemigroup<string>()
const codeStringsSemigroup = semigroup.struct({
  css: stringArraySemigroup,
  html: stringArraySemigroup,
  js: stringArraySemigroup,
})

const DemoProvider: React.FC = ({ children }) => {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlocks>({
    main: { css: new Set(), html: new Set(), js: new Set() },
    sub: { css: new Set(), html: new Set(), js: new Set() },
  })

  const codeStrings = useMemo(
    () => ({ main: grabCodeBlocksInnerTexts(codeBlocks.main), sub: grabCodeBlocksInnerTexts(codeBlocks.sub) }),
    [codeBlocks],
  )

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
      <DemoCodeStringsProvider {...codeStrings}>{children}</DemoCodeStringsProvider>
    </DemoCodeBlockDispatchProvider>
  )
}

export { codeStringsSemigroup }

export { DemoProvider as Root, useDemoCodeBlockDispatch as useDispatch, useDemoCodeStrings as useCodeStrings }
export type { Language, CodeStrings }
