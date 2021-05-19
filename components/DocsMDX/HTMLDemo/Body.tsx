import { record } from 'fp-ts'
import { useMemo } from 'react'

import * as DemoProvider from '../DemoProvider'
import LiveCode from '../LiveCode'

const grabInnerText = (elSet: Set<HTMLElement>) => Array.from(elSet.values()).map((el) => el.innerText)
const grabCodeBlocksInnerTexts = record.map(grabInnerText)

const HTMLDemoBody: React.FC = ({ children }) => {
  const codeBlocks = DemoProvider.useCodeBlocks()

  if (!codeBlocks) {
    throw new Error("HTMLDemoBody couldn't find DemoProvider.")
  }

  const stringifiedCodeBlocks = useMemo(() => grabCodeBlocksInnerTexts(codeBlocks), [codeBlocks])

  return (
    <aside aria-label="데모">
      {children}
      <LiveCode
        data={{
          htmls: stringifiedCodeBlocks.html,
          scripts: stringifiedCodeBlocks.js,
          styles: stringifiedCodeBlocks.css,
        }}
      />
    </aside>
  )
}

export default HTMLDemoBody
