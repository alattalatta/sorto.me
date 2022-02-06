import { useMemo } from 'react'
import runtime from 'react/jsx-runtime'

type RendererProps = {
  components?: Record<string, React.ReactNode>
}

type EvaluatedSource = { default: React.VFC<RendererProps> }

function useMDXRenderer(compiledSource: string): React.VFC<RendererProps> {
  const renderer: React.VFC<RendererProps> = useMemo(() => {
    const hydrateFn = Reflect.construct(Function, ['opts', compiledSource]) as (
      opts: Readonly<typeof runtime>,
      source: string,
    ) => EvaluatedSource

    return hydrateFn.apply(hydrateFn, [{ ...runtime }, compiledSource]).default
  }, [compiledSource])

  return renderer
}

export { useMDXRenderer }
