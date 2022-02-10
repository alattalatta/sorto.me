import Head from 'next/head'
import React from 'react'

import BlogSearchField from 'components/BlogSearchField'
import SearchResult from 'components/SearchResult'
import { Container as BaseContainer } from 'components/basics'
import { useSearchQuery } from 'hooks/useSearchQuery'
import { styled } from 'utils/styler'
import type { Page } from 'utils/types'

const Container = styled(BaseContainer, {
  '& gsc-control-cse': {
    padding: '10px 0 0',
  },
})

const BlogSearch: Page = () => {
  const searchQuery = useSearchQuery()

  const title = searchQuery ? `${searchQuery} 검색 결과 - Sorto.me` : '검색 결과 - Sorto.me'

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta key="og:title" content={title} property="og:title" />
      </Head>
      <Container>
        <BlogSearchField initialValue={searchQuery} />
        <SearchResult cx="2583b4522ab9cd371" query={searchQuery} />
      </Container>
    </>
  )
}

export default BlogSearch
