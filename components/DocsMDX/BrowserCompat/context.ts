import { createContext } from 'react'

import type { Identifier } from '@mdn/browser-compat-data/types'

export const BCDContext = createContext<{ data: Identifier; name: string } | null>(null)
