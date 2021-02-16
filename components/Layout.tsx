import React from 'react'

import BaseHeader from './BaseHeader'

type Props = {
  children: {
    brand?: React.ReactNode
    menu: React.ReactNode
    page: React.ReactNode
  }
}

const Layout: React.FC<Props> = ({ children: { brand, menu, page } }) => {
  return (
    <div>
      <BaseHeader>
        {{
          brand,
          menu,
        }}
      </BaseHeader>
      <main>{page}</main>
    </div>
  )
}
export default Layout

export const getLayout = (menu: React.ReactNode, brand?: React.ReactNode) => (page: JSX.Element): JSX.Element => (
  <Layout>{{ brand, menu, page }}</Layout>
)
