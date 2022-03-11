import { Anchor } from './Anchor'
import * as styles from './Footer.css'

type Props = {
  mdnSlug?: string
  updated: Date
}

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
    <footer className={styles.root}>
      <p className={styles.updated}>
        마지막 업데이트: <time dateTime={updated.toISOString()}>{updatedFormatted}</time>
      </p>
      <p className={styles.author}>sorto.me</p>
      <small className={styles.legal}>
        <p className={styles.license}>CC BY-SA 4.0</p>
        {mdnSlug && (
          <p className={styles.mdn}>
            based on{' '}
            <Anchor href={`https://developer.mozilla.org/en-US/${mdnSlug}`} target="_blank">
              MDN
            </Anchor>{' '}
            <Anchor href={`https://developer.mozilla.org/en-US/${mdnSlug}/contributors.txt`} target="_blank">
              (contributors)
            </Anchor>
          </p>
        )}
      </small>
    </footer>
  )
}

export { Footer }
