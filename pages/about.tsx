import Head from 'next/head'

import AboutBody from 'components/AboutBody'
import { getLayout } from 'components/Layout'
import { Page } from 'utils/types'

const About: Page = () => {
  return (
    <div>
      <Head>
        <title key="title">About</title>
      </Head>
      <AboutBody />
    </div>
  )
}
About.getLayout = getLayout
export default About
