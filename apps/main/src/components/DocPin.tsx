/* eslint-disable react-hooks/rules-of-hooks */
import { get, pin, type RecentlyViewedDoc } from 'db/RecentlyViewedDocs'
import { useLiveQuery } from 'dexie-react-hooks'
import imgPinFilled from 'images/drawing-pin-filled.svg'
import imgPin from 'images/drawing-pin.svg'

import styles from './DocPin.module.scss'

type Props = {
  doc?: RecentlyViewedDoc
}

const DocPin: React.FC<Props> = ({ doc: docProp }) => {
  // Suppress strange invalid hook warning in dev server
  if (typeof window === 'undefined') {
    return <div className={styles.pinButton} />
  }

  const doc = useLiveQuery(() => docProp ?? get(location.pathname))

  if (!doc) {
    return <div className={styles.pinButton} />
  }

  return (
    <button
      aria-pressed={doc.pinned === 1}
      className={styles.pinButton}
      type="button"
      onClick={() => void pin(doc.id, doc.pinned ? 0 : 1)}
    >
      <img alt="고정하기" src={doc.pinned ? imgPinFilled.src : imgPin.src} width="16" />
    </button>
  )
}

export default DocPin
