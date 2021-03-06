import Head from 'next/head'
import { useRouter } from 'next/router'

import { Page } from 'utils/types'

import 'styles/reset.css'

function App({ Component, pageProps }: { Component: Page; pageProps: Record<string, unknown> }): JSX.Element {
  const router = useRouter()

  const getLayout = Component.getLayout || ((a) => a)

  return getLayout(
    <>
      <Head>
        <title key="title">Sorto.me</title>
        <meta key="description" name="description" content="Sorto.me - Blog/Web Docs" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content="Sorto.me" />
        <meta key="og:description" property="og:description" content="Sorto.me - Blog/Web Docs" />
        <meta key="og:url" property="og:url" content={`https://sorto.me${router.asPath}`} />
      </Head>
      <Component {...pageProps} />
    </>,
  )
}

export default App
