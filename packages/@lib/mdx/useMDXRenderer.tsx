import { useMemo } from 'react'
import runtime from 'react/jsx-runtime'

type RendererProps = {
  [key: string]: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.ComponentType<any>>
}

type EvaluatedSource = { default: React.FC<RendererProps> }

function useMDXRenderer(compiledSource: string): React.FC<RendererProps> {
  const renderer: React.FC<RendererProps> = useMemo(() => {
    const hydrateFn = Reflect.construct(Function, ['opts', compiledSource]) as (
      opts: Readonly<typeof runtime>,
      source: string,
    ) => EvaluatedSource

    return hydrateFn.apply(hydrateFn, [{ ...runtime }, compiledSource]).default
  }, [compiledSource])

  return renderer
}

export { useMDXRenderer }
