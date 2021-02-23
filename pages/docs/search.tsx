import Head from 'next/head'
import React from 'react'

import Brand from 'components/Brand'
import DocMenu from 'components/DocMenu'
import DocSearchField from 'components/DocSearchField'
import { getLayout } from 'components/Layout'
import SearchResult from 'components/SearchResult'
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
      </Head>
      <Container>
        <DocSearchField initialValue={searchQuery} />
        <SearchResult cx="2398f7a238d7a4f0e" query={searchQuery} />
      </Container>
    </>
  )
}
DocSearch.getLayout = getLayout(<DocMenu />, <Brand href="/docs" />)

export default DocSearch
