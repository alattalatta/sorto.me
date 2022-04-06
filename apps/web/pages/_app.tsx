import { theme as darkTheme } from '@lib/ui/theme/dark.css'
import { theme as lightTheme } from '@lib/ui/theme/light.css'
import type { LazyFeatureBundle } from 'framer-motion'
import { LazyMotion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import type { Page } from '../utils/types'

import '../styles/reset.css'

const framerFeatures: LazyFeatureBundle = () => import('../utils/lazyFramer').then((module) => module.default)

function App({ Component, pageProps }: { Component: Page; pageProps: Record<string, unknown> }): JSX.Element {
  const router = useRouter()

  const Layout = Component.Layout || (({ children }) => <>{children}</>)

  return (
    <LazyMotion features={framerFeatures} strict={process.env.NODE_ENV !== 'production'}>
      <ThemeProvider attribute="class" value={{ dark: darkTheme, light: lightTheme }}>
        <Layout>
          <Head>
            <title key="title">sorto.me</title>
            <meta key="description" content="sorto.me" name="description" />
            <meta key="og:type" content="website" property="og:type" />
            <meta key="og:title" content="sorto.me" property="og:title" />
            <meta key="og:description" content="sorto.me" property="og:description" />
            <meta key="og:url" content={`https://sorto.me${router.asPath}`} property="og:url" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      {process.env.NEXT_PUBLIC_ANALYTICS && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-7F0E6D3XE2" />
          <Script id="google-analytics">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_ANALYTICS_ID}');`}
          </Script>
        </>
      )}
    </LazyMotion>
  )
}

export default App
