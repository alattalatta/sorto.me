import { FramePage } from '@domain/docs'
import type { GetServerSideProps } from 'next'

export default FramePage

export const getServerSideProps: GetServerSideProps = ({ req }) => {
  if (process.env.NODE_ENV === 'production' && !req.headers.referer?.startsWith('https://sorto.me')) {
    return Promise.resolve({
      notFound: true,
    })
  }

  return Promise.resolve({
    props: {},
  })
}
