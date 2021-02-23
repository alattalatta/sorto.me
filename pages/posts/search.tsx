import Head from 'next/head'
import React from 'react'

import BlogMenu from 'components/BlogMenu'
import BlogSearchField from 'components/BlogSearchField'
import Brand from 'components/Brand'
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

const BlogSearch: Page = () => {
  const searchQuery = useSearchQuery()

  const title = searchQuery ? `${searchQuery} 검색 결과 - Sorto.me` : '검색 결과 - Sorto.me'

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta key="og:title" property="og:title" content={title} />
      </Head>
      <Container>
        <BlogSearchField initialValue={searchQuery} />
        <SearchResult cx="2583b4522ab9cd371" query={searchQuery} />
      </Container>
    </>
  )
}
BlogSearch.getLayout = getLayout(<BlogMenu />, <Brand />)

export default BlogSearch
