import { Page } from 'utils/types'

import 'styles/reset.css'

function App({ Component, pageProps }: { Component: Page; pageProps: Record<string, unknown> }): JSX.Element {
  const getLayout = Component.getLayout || ((a) => a)

  return getLayout(<Component {...pageProps} />)
}

export default App
