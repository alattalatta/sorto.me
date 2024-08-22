import { listPinned, listUnpinned } from 'db/RecentlyViewedDocs'
import { useLiveQuery } from 'dexie-react-hooks'

import RecentlyViewedDoc from './RecentlyViewedDoc'
import styles from './RecentlyViewedDocs.module.scss'

const LIMIT = 8

const RecentlyViewedDocs: React.FC = () => {
  const pinned = useLiveQuery(listPinned)
  const unpinned = useLiveQuery(() => listUnpinned(LIMIT))

  if (!pinned || !unpinned) {
    return (
      <section aria-labelledby="recently-viewed">
        <h3 className={styles.heading} id="recently-viewed">
          고정한 문서
        </h3>
      </section>
    )
  }

  return (
    <div>
      <section aria-labelledby="recently-viewed">
        <h3 className={styles.heading} id="recently-viewed">
          고정한 문서
        </h3>
        {pinned.length > 0 ? (
          <div className={styles.list}>
            {pinned.map((doc) => (
              <RecentlyViewedDoc key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <p>고정한 문서가 없습니다. 최근 본 문서를 고정해 보세요.</p>
        )}
      </section>
      <section>
        <h3 className={styles.heading} id="recently-viewed">
          최근 본 문서
        </h3>
        {unpinned.length > 0 ? (
          <div className={styles.list}>
            {unpinned.map((doc) => (
              <RecentlyViewedDoc key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <p>최근 본 문서가 없습니다.</p>
        )}
      </section>
    </div>
  )
}

export default RecentlyViewedDocs
