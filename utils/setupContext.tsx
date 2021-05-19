import React, { createContext, useMemo } from 'react'

/**
 * Returns memoized context provider and its consumer hook.
 *
 * {@link https://github.com/radix-ui/primitives/blob/247de36/packages/react/context/src/createContext.tsx Source}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function setupContext<ContextValueType extends object>(
  name: string,
): readonly [React.FC<ContextValueType>, () => ContextValueType | null] {
  const Context = createContext<ContextValueType | null>(null)

  const Provider: React.FC<ContextValueType> = ({ children, ...props }) => {
    const value = useMemo(() => props, Object.values(props)) as ContextValueType

    return <Context.Provider value={value}>{children}</Context.Provider>
  }
  Provider.displayName = name + 'Provider'

  function useContext() {
    const context = React.useContext(Context)

    return context
  }

  return [Provider, useContext] as const
}

export { setupContext }
