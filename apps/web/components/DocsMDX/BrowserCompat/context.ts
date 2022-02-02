import type { Identifier } from '@mdn/browser-compat-data/types'
import { createContext } from 'react'

export const BCDContext = createContext<{ data: Identifier; name: string } | null>(null)
