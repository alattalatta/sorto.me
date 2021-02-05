import { NextPage } from 'next'

export type Page<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: JSX.Element) => JSX.Element
}

export type PropOf<C> = C extends React.FC<infer P> ? P : never
