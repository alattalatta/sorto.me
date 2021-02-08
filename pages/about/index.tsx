import Head from 'next/head'

import AboutBody from 'components/AboutBody'
import { getLayout } from 'components/Layout'
import { Page } from 'utils/types'

const About: Page = () => {
  return (
    <div>
      <Head>
        <title key="title">About - Sorto.me</title>
        <meta key="description" content="alattalatta" />
        <meta key="og:title" property="og:title" content="Sorto.me - About" />
        <meta key="og:description" property="og:description" content="alattalatta" />
      </Head>
      <AboutBody />
    </div>
  )
}
About.getLayout = getLayout
export default About