import { useEffect, useRef } from 'react'

import * as CodeBlock from '../MDX/CodeBlock'
import * as DemoProvider from './DemoProvider'

const PolyCodeBlock: React.FC<CodeBlock.BodyProps> = (props) => {
  const ref = useRef<HTMLElement>(null)

  const demoDispatch = DemoProvider.useDispatch()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const language = props.className?.match(/language-(css|html|js)/)?.[1] as DemoProvider.Language | undefined
    if (!language) {
      return
    }

    demoDispatch?.register(props.sub ?? true, language, ref.current)

    return () => {
      ref.current && demoDispatch?.unregister(props.sub ?? true, language, ref.current)
    }
  }, [])

  return <CodeBlock.Body ref={ref} {...props} />
}

export default PolyCodeBlock
