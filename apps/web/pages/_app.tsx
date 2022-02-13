import type { LazyFeatureBundle } from 'framer-motion'
import { LazyMotion } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'

import type { Page } from 'utils/types'

import 'styles/reset.css'
import 'styles/syntax.css'

const framerFeatures: LazyFeatureBundle = () => import('utils/lazyFramer').then((module) => module.default)

function App({ Component, pageProps }: { Component: Page; pageProps: Record<string, unknown> }): JSX.Element {
  const router = useRouter()

  const Layout = Component.Layout || (({ children }) => <>{children}</>)

  return (
    <LazyMotion features={framerFeatures} strict={process.env.NODE_ENV !== 'production'}>
      <Layout>
        <Head>
          <title key="title">Sorto.me</title>
          <meta key="description" content="sorto.me" name="description" />
          <meta key="og:type" content="website" property="og:type" />
          <meta key="og:title" content="sorto.me" property="og:title" />
          <meta key="og:description" content="sorto.me" property="og:description" />
          <meta key="og:url" content={`https://sorto.me${router.asPath}`} property="og:url" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </LazyMotion>
  )
}

export default App
