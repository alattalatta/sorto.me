import Head from 'next/head'
import React from 'react'

import DocIntroBody from 'components/DocIntroBody'
import DocMenu from 'components/DocMenu'
import { getLayout } from 'components/Layout'
import { Page } from 'utils/types'

const DocIntro: Page = () => {
  return (
    <div>
      <Head>
        <title key="title">Docs - Sorto.me</title>
        <meta key="description" content="Sorto.me Docs에 대해" />
        <meta key="og:title" property="og:title" content="Sorto.me - Docs" />
        <meta key="og:description" property="og:description" content="Sorto.me Docs에 대해" />
      </Head>
      <DocIntroBody />
    </div>
  )
}
DocIntro.getLayout = getLayout(<DocMenu />)
export default DocIntro
