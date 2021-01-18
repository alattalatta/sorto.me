import { NextPage } from 'next'

export type Page<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: JSX.Element) => JSX.Element
}
