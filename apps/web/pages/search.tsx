import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { Layout } from 'components/Layout'
import { SearchBody } from 'components/SearchBody'
import { useSearchQuery } from 'hooks/useSearchQuery'
import type { Page } from 'utils/types'

const DocSearch: Page = () => {
  const searchQuery = useSearchQuery()

  const title = searchQuery ? `${searchQuery} 검색 결과 - sorto.me` : '검색 결과 - sorto.me'

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta key="og:title" content={title} property="og:title" />
      </Head>
      {mounted && <SearchBody query={searchQuery} />}
    </>
  )
}
DocSearch.Layout = ({ children }) => (
  <Layout topStrip={false} width={768}>
    {children}
  </Layout>
)

export default DocSearch
