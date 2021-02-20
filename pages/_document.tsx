import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { getCssString } from 'utils/styler'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssString() }} />
        </>
      ),
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Gothic:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-7F0E6D3XE2" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${
                process.env.NEXT_PUBLIC_ANALYTICS_ID
              }',{debug_mode:${process.env.NODE_ENV !== 'production'}});`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
