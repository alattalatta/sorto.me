import { useContext } from 'react'

import { UniqueIDContext } from 'components/MDX/UniqueIDContext'
import { sanitizeID } from 'utils/element'

export function useUniqueID(text: string): string {
  const headingIDContext = useContext(UniqueIDContext)

  const textContent = sanitizeID(text)

  const count = headingIDContext?.get(textContent) || 0
  const id = count ? `${textContent}-${count}` : textContent
  headingIDContext?.set(textContent, count + 1)

  return id
}
