import Head from 'next/head'
import React from 'react'

import Brand from 'components/Brand'
import DocMenu from 'components/DocMenu'
import { getLayout } from 'components/Layout'
import { Container as BaseContainer } from 'components/basics'
import { useSearchQuery } from 'hooks/useSearchQuery'
import { styled } from 'utils/styler'
import { Page } from 'utils/types'

const Container = styled(BaseContainer, {
  '& gsc-control-cse': {
    padding: '10px 0 0',
  },
})

const DocSearch: Page = () => {
  const searchQuery = useSearchQuery()

  const title = searchQuery ? `${searchQuery} 검색 결과 - Sorto.me Docs` : '검색 결과 - Sorto.me Docs'

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta key="og:title" property="og:title" content={title} />
        {searchQuery && <script async src="https://cse.google.com/cse.js?cx=2398f7a238d7a4f0e" />}
      </Head>
      <Container>{searchQuery && <div className="gcse-searchresults-only" />}</Container>
    </>
  )
}
DocSearch.getLayout = getLayout(<DocMenu />, <Brand />)

export default DocSearch
