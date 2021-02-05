import React from 'react'

import { styled } from 'utils/styler'

import PageHeader, { HEADER_HEIGHT } from './PageHeader'

const Body = styled('main', {
  paddingTop: HEADER_HEIGHT,
})

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <PageHeader />
      <Body>{children}</Body>
    </div>
  )
}
export default Layout

export const getLayout = (page: JSX.Element): JSX.Element => <Layout>{page}</Layout>
