import Head from 'next/head'
import React from 'react'

import BlogMenu from 'components/BlogMenu'
import BlogSearchField from 'components/BlogSearchField'
import Brand from 'components/Brand'
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

const BlogSearch: Page = () => {
  const searchQuery = useSearchQuery()

  const title = searchQuery ? `${searchQuery} 검색 결과 - Sorto.me` : '검색 결과 - Sorto.me'

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta key="og:title" property="og:title" content={title} />
        {searchQuery && <script async src="https://cse.google.com/cse.js?cx=2583b4522ab9cd371" />}
      </Head>
      <Container>
        <BlogSearchField initialValue={searchQuery} />
        {searchQuery && <div className="gcse-searchresults-only" />}
      </Container>
    </>
  )
}
BlogSearch.getLayout = getLayout(<BlogMenu />, <Brand />)

export default BlogSearch
