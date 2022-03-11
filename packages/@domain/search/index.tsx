import type { Page } from '@lib/ui'
import { Layout } from '@lib/ui'
import * as input from '@lib/ui/input.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import * as styles from './index.css'
import { useSearchQuery } from './useSearchQuery'

const SearchPage: Page = () => {
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
      {mounted && (
        <main className={styles.root}>
          {searchQuery ? (
            <>
              <form className={styles.searchBox} method="get">
                <input className={input.root} defaultValue={searchQuery} name="q" type="search" />
                <button className={styles.submitButton} style={{ marginLeft: '.5em' }} type="submit">
                  검색
                </button>
              </form>
              <div className="gcse-searchresults-only" />
              <Head>
                <script key="gcse" async src="https://cse.google.com/cse.js?cx=2583b4522ab9cd371" />
              </Head>
            </>
          ) : (
            <form className={styles.emptyQueryBody} method="get">
              <input className={input.root} name="q" type="search" />
              <button className={styles.submitButton} style={{ marginTop: '1em' }} type="submit">
                검색
              </button>
            </form>
          )}
        </main>
      )}
    </>
  )
}
SearchPage.Layout = Layout

export { SearchPage }
