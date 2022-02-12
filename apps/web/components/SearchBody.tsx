import { Input, styled } from '@app/ui'
import Head from 'next/head'

type Props = {
  query?: string
}

const Root = styled('main', {
  maxWidth: `${768 / 16}rem`,
  margin: '0 auto',
  padding: '1.5em 0 1em',

  '& .gsc-control-cse': {
    marginTop: '1.5em',
    padding: 0,
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
  position: 'fixed',
  inset: 0,
})

const SubmitButton = styled('button', {
  width: `${96 / 16}em`,
  height: `${40 / 16}em`,
  background: '#2c2c2c',
  border: 'none',
  color: '#fff',
  fontSize: '1em',
  padding: 0,
})

const SearchBody: React.VFC<Props> = ({ query }) => {
  return (
    <Root>
      {query ? (
        <>
          <SearchBox>
            <Input defaultValue={query} name="q" type="search" />
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
  )
}

export { SearchBody }
