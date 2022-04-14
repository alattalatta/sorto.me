import type { NextPage } from 'next'

export type Page<P = Record<string, unknown>> = NextPage<P> & {
  Layout?: React.FC<{ children: React.ReactNode }>
}
