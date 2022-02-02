import Head from 'next/head'
import React from 'react'

import { styled } from 'utils/styler'

import styles from './styles.module.scss'

const Empty = styled('p', {
  fontSize: 20,
  marginTop: 48,
})

const SearchResult: React.VFC<{ cx: string; query: string | null }> = ({ cx, query }) => {
  if (!query) {
    return <Empty>검색어를 입력하세요.</Empty>
  }

  return (
    <>
      <Head>
        <script key="gcse" async src={`https://cse.google.com/cse.js?cx=${cx}`} />
      </Head>
      <div className={styles.wrap}>
        <div className="gcse-searchresults-only" />
      </div>
    </>
  )
}

export default SearchResult
