import { readonlyArray, semigroup } from 'fp-ts'

type Language = 'css' | 'html' | 'js'
type CodeBlocks = Record<'main' | 'sub', Record<Language, Set<HTMLElement>>>
type CodeStrings = Record<'main' | 'sub', Record<Language, readonly string[]>>

type CodeBlockDispatch = (main: boolean, language: Language, element: HTMLElement) => void
type CodeBlockDispatchers = {
  register: CodeBlockDispatch
  unregister: CodeBlockDispatch
}

const stringArraySemigroup = readonlyArray.getSemigroup<string>()
const codeBlockSemigroup = semigroup.struct({
  css: stringArraySemigroup,
  html: stringArraySemigroup,
  js: stringArraySemigroup,
})

export type { Language, CodeBlocks, CodeStrings, CodeBlockDispatch, CodeBlockDispatchers }
export { codeBlockSemigroup }
