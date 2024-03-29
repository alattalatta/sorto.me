import { fontsTheme, timingsTheme } from '@lib/ui/theme.css'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class TheDocument extends Document {
  render(): JSX.Element {
    return (
      <Html className={`${fontsTheme} ${timingsTheme}`} lang="ko">
        <Head>
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Nanum+Gothic+Coding:wght@400;700&family=Noto+Serif+KR:wght@500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
            rel="stylesheet"
          />
          <link href="/favicon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
          <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
