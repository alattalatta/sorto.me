import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

import { getCssString } from 'utils/styler'

export default class TheDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: getCssString() }} id="stitches" />
        </>
      ),
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Gothic:wght@400;700&family=Noto+Serif+KR:wght@500;700&display=swap"
            rel="stylesheet"
          />
          <link href="/favicon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
          <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          {process.env.NEXT_PUBLIC_ANALYTICS && (
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-7F0E6D3XE2" />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_ANALYTICS_ID}');`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
