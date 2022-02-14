import type { Page } from '@lib/ui'
import { Input, Layout, styled } from '@lib/ui'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { useSearchQuery } from './useSearchQuery'

const Root = styled('main', {
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
  padding: '1.5rem 0 1rem',

  '& .gsc-control-cse': {
    marginTop: '1.5rem',
    padding: 0,

    '& .gsc-result': {
      padding: '0.75rem 0',
    },
    '& .gs-title': {
      color: '$highlight',
      overflow: 'visible',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& .gs-visibleUrl-breadcrumb': {
      color: 'inherit',
      marginTop: '.25em',
    },
    '& .gs-snippet': {
      color: 'inherit',
      fontSize: '1rem',
      marginTop: '.25em',
    },
    '& b': {
      background: '$bgSuppl',
      textDecoration: 'underline',
    },
  },
})

const SearchBox = styled('form', {
  display: 'flex',
  alignItems: 'center',
})

const EmptyQueryBody = styled('form', {
  maxWidth: `${768 / 16}rem`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: 'auto',
  paddingBottom: '1rem',
  position: 'fixed',
  inset: 0,
})

const SubmitButton = styled('button', {
  width: `${96 / 16}rem`,
  height: `${40 / 16}rem`,
  background: '$fg',
  border: 'none',
  color: '$bg',
  fontSize: '1em',
  padding: 0,
})

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
        <Root>
          {searchQuery ? (
            <>
              <SearchBox>
                <Input defaultValue={searchQuery} name="q" type="search" />
                <SubmitButton css={{ marginLeft: '.5em' }} type="submit">
                  검색
                </SubmitButton>
              </SearchBox>
              <div className="gcse-searchresults-only" />
              <Head>
                <script key="gcse" async src="https://cse.google.com/cse.js?cx=2583b4522ab9cd371" />
              </Head>
            </>
          ) : (
            <EmptyQueryBody method="get">
              <Input name="q" type="search" />
              <SubmitButton css={{ marginTop: '1em' }} type="submit">
                검색
              </SubmitButton>
            </EmptyQueryBody>
          )}
        </Root>
      )}
    </>
  )
}
SearchPage.Layout = Layout

export { SearchPage }
