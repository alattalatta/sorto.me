import Head from 'next/head'
import React from 'react'

import DocIntroBody from 'components/DocIntroBody'
import DocMenu from 'components/DocMenu'
import { getLayout } from 'components/Layout'
import type { Page } from 'utils/types'

const DocIntro: Page = () => {
  return (
    <div>
      <Head>
        <title key="title">Docs - Sorto.me</title>
        <meta key="description" content="Sorto.me Docs에 대해" />
        <meta key="og:title" content="Sorto.me - Docs" property="og:title" />
        <meta key="og:description" content="Sorto.me Docs에 대해" property="og:description" />
      </Head>
      <DocIntroBody />
    </div>
  )
}
DocIntro.getLayout = getLayout(<DocMenu />)
export default DocIntro
