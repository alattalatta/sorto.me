import { styled } from './stitches'

type Props = {
  mdnSlug?: string
  updated: Date
}

const Root = styled('footer', {
  width: `${219 / 16}rem`,
  borderTop: '1px solid #2c2c2c',
  fontFamily: `Roboto, Pretendard, sans-serif`,
  marginTop: '5rem',
  padding: '1.5rem 0 0.5rem',
})

const Updated = styled('p', {
  fontSize: `${14 / 16}rem`,
  margin: 0,
})

const Author = styled('p', {
  fontSize: '1.5rem',
  fontWeight: 700,
  margin: 0,
})

const Legal = styled('small', {
  display: 'block',
  fontSize: `${10 / 16}rem`,
  fontStyle: 'italic',
})

const License = styled('p', {
  fontWeight: 500,
  margin: 0,
})

const MDN = styled('p', {
  margin: 0,

  '& a': {
    color: '#0CA79D',
    textDecoration: 'none',
  },
})

const HOUR = 1000 * 60 * 60
const DAY = HOUR * 24

const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' })
const atf = new Intl.DateTimeFormat('ko')

const Footer: React.VFC<Props> = ({ mdnSlug, updated }) => {
  // use absolute when older than a week
  const useAbsoluteTime = Date.now() - updated.getTime() > DAY * 7
  const updatedFormatted = (() => {
    if (useAbsoluteTime) {
      return atf.format(updated)
    }

    const diff = updated.getTime() - Date.now()
    if (Math.abs(diff) < DAY) {
      return rtf.format(Math.floor(diff / HOUR), 'hour')
    }

    return rtf.format(Math.floor(diff / DAY), 'day')
  })()

  return (
    <Root>
      <Updated>
        마지막 업데이트: <time dateTime={updated.toISOString()}>{updatedFormatted}</time>
      </Updated>
      <Author>sorto.me</Author>
      <Legal>
        <License>CC BY-SA 4.0</License>
        {mdnSlug && (
          <MDN>
            based on{' '}
            <a href={`https://developer.mozilla.org/en-US/${mdnSlug}`} target="_blank">
              MDN
            </a>{' '}
            <a href={`https://developer.mozilla.org/en-US/${mdnSlug}/contributors.txt`} target="_blank">
              (contributors)
            </a>
          </MDN>
        )}
      </Legal>
    </Root>
  )
}

export { Footer }
