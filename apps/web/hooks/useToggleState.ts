import { useState } from 'react'

export function useToggleState(initial: boolean): [boolean, () => void, (value: boolean) => void] {
  const [state, setState] = useState(initial)

  return [state, () => setState(!state), setState]
}
