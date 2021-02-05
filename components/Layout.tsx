import React from 'react'

import PageHeader from './PageHeader'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <PageHeader />
      <main>{children}</main>
    </div>
  )
}
export default Layout

export const getLayout = (page: JSX.Element): JSX.Element => <Layout>{page}</Layout>
