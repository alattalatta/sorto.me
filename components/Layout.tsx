import React from 'react'

import Header from './Header'

type Props = {
  children: {
    brand?: React.ReactNode
    menu: React.ReactNode
    page: React.ReactNode
  }
  variants?: { brightness: 'dark' | 'light' }
}

const Layout: React.FC<Props> = ({ children: { brand, menu, page }, variants }) => {
  return (
    <div>
      <Header {...variants}>
        {{
          brand,
          menu,
        }}
      </Header>
      <main id="main">{page}</main>
    </div>
  )
}
export default Layout

export const getLayout =
  (menu: React.ReactNode, brand?: React.ReactNode, variants?: { brightness: 'dark' | 'light' }) =>
  (page: JSX.Element): JSX.Element =>
    <Layout variants={variants}>{{ brand, menu, page }}</Layout>
