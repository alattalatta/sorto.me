import React from 'react'

type Props = {
  children: {
    body: React.ReactNode
    header: React.ReactNode
  }
}

const Layout: React.FC<Props> = ({ children: { body, header } }) => {
  return (
    <div>
      {header}
      <main>{body}</main>
    </div>
  )
}
export default Layout

export const getLayout = (header: React.ReactNode) => (page: JSX.Element): JSX.Element => (
  <Layout>{{ body: page, header }}</Layout>
)
